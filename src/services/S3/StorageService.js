const AWS = require('aws-sdk');

class StorageService {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._S3 = new AWS.S3();
  }

  writeFile(file, meta) {
    const parameter = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: +new Date() + meta.filename,
      // eslint-disable-next-line no-underscore-dangle
      Body: file._data,
      ContentType: meta.headers['content-type'],
    };

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this._S3.upload(parameter, (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data.Location);
      });
    });
  }
}

module.exports = StorageService;
