const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class AuthenticationsService {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._pool = new Pool();
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    };
    // eslint-disable-next-line no-underscore-dangle
    await this._pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    // eslint-disable-next-line no-underscore-dangle
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Refresh token tidak valid');
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token=$1 RETURNING token',
      values: [token],
    };
    // eslint-disable-next-line no-underscore-dangle
    await this._pool.query(query);
  }
}

module.exports = AuthenticationsService;
