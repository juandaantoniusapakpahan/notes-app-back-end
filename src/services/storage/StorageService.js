const fs = require('fs');

class StorageService {
  constructor(folder) {
    // eslint-disable-next-line no-underscore-dangle
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
      // Options recursive: true membuat mkdirSync bekerja secara rekursif
    }
  }

  // eslint-disable-next-line class-methods-use-this
  writeFile(file, meta) {
    const filename = +new Date() + meta.filename;
    // eslint-disable-next-line no-underscore-dangle
    const path = `${this._folder}/${filename}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;
