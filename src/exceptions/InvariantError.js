const ClientError = require('./ClientError');

class InvariantError extends ClientError {
  // eslint-disable-next-line no-useless-constructor
  constructor(message) {
    super(message);
    this.name = 'IvariantError';
  }
}
module.exports = InvariantError;
