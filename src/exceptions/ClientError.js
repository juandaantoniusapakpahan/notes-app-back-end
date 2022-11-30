class ClientError extends Error {
  // eslint-disable-next-line no-useless-constructor
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

module.exports = ClientError;
