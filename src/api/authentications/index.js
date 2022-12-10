const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, {
    // eslint-disable-next-line no-undef
    authenticationsService,
    // eslint-disable-next-line no-undef
    usersService,
    // eslint-disable-next-line no-undef
    tokenManager,
    // eslint-disable-next-line no-undef
    validator,
  }) => {
    // eslint-disable-next-line max-len
    const authenticationResult = new AuthenticationsHandler(authenticationsService, usersService, tokenManager, validator);
    server.route(routes(authenticationResult));
  },
};
