const redis = require('redis');

class CacheService {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._client = redis.createClient({
      socket: {
        host: process.env.REDIS_SERVER,
      },
    });
    // eslint-disable-next-line no-underscore-dangle
    this._client.on('error', (error) => {
      console.error(error);
    });
    // eslint-disable-next-line no-underscore-dangle
    this._client.connect();
  }

  async set(key, value, expirationInSecond = 3600) {
    // eslint-disable-next-line no-underscore-dangle
    await this._client.set(key, value, {
      EX: expirationInSecond,
    });
  }

  async get(key) {
    // eslint-disable-next-line no-underscore-dangle
    const result = await this._client.get(key);
    if (result === null) throw new Error('Cache tidak ditemukan');
    return result;
  }

  delete(key) {
    // eslint-disable-next-line no-underscore-dangle
    return this._client.del(key);
  }
}

module.exports = CacheService;
