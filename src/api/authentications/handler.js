const ClientError = require('../../exceptions/ClientError');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    // eslint-disable-next-line no-underscore-dangle
    this._authenticationsService = authenticationsService;
    // eslint-disable-next-line no-underscore-dangle
    this._usersService = usersService;
    // eslint-disable-next-line no-underscore-dangle
    this._tokenManager = tokenManager;
    // eslint-disable-next-line no-underscore-dangle
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      this._validator.validatePostAuthenticationPayload(request.payload);
      const { username, password } = request.payload;
      // eslint-disable-next-line no-underscore-dangle
      const id = await this._usersService.verifyUserCredential(username, password);

      // eslint-disable-next-line no-underscore-dangle
      const accessToken = this._tokenManager.generateAccessToken({ id });

      // eslint-disable-next-line no-underscore-dangle
      const refreshToken = this._tokenManager.generateRefreshToken({ id });

      // eslint-disable-next-line no-underscore-dangle
      await this._authenticationsService.addRefreshToken(refreshToken);
      const response = h.response({
        status: 'success',
        message: 'Authentication berhasil ditambahkan',
        data: {
          accessToken,
          refreshToken,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async putAuthenticationHandler(request, h) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      this._validator.validatePutAuthenticationPayload(request.payload);

      const { refreshToken } = request.payload;
      // eslint-disable-next-line no-underscore-dangle
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      // eslint-disable-next-line no-underscore-dangle
      const { id } = this._tokenManager.verifyRefreshToken(refreshToken);
      // eslint-disable-next-line no-underscore-dangle
      const accessToken = this._tokenManager.generateAccessToken({ id });
      return {
        status: 'success',
        message: 'Access Token berhasil diperbarui',
        data: {
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteAuthenticationHandler(request, h) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      this._validator.validateDeleteAuthenticationPayload(request.payload);
      const { refreshToken } = request.payload;
      // eslint-disable-next-line no-underscore-dangle
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      // eslint-disable-next-line no-underscore-dangle
      await this._authenticationsService.deleteRefreshToken(refreshToken);

      return {
        status: 'success',
        message: 'Refresh token berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = AuthenticationsHandler;
