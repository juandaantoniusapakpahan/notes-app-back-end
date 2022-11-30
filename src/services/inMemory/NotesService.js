const { nanoid } = require('nanoid');

// eslint-disable-next-line no-unused-vars
class NotesService {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._notes = [];
  }

  // eslint-disable-next-line class-methods-use-this
  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      id, title, body, tags, createdAt, updatedAt,
    };

    // eslint-disable-next-line no-underscore-dangle
    this._notes.push(newNote);

    // eslint-disable-next-line no-underscore-dangle
    const isSuccess = this._notes.filter((n) => n.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('Catatan gagal ditambahkan');
    }
    return id;
  }

  getNotes() {
    // eslint-disable-next-line no-underscore-dangle
    return this._notes;
  }

  getNoteById(id) {
    // eslint-disable-next-line no-underscore-dangle
    const note = this._notes.filter((n) => n.id === id)[0];

    if (!note) {
      throw new Error('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, { title, body, tags }) {
    // eslint-disable-next-line no-underscore-dangle
    const idx = this._notes.findIndex((n) => n.id === id);

    if (idx === -1) {
      throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
    }
    const updatedAt = new Date().toISOString();
    // eslint-disable-next-line no-underscore-dangle
    this._notes[idx] = {
      // eslint-disable-next-line no-underscore-dangle
      ...this._notes[idx],
      title,
      body,
      tags,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    // eslint-disable-next-line no-underscore-dangle
    const idx = this._notes.findIndex((n) => n.id === id);

    if (idx === -1) {
      throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
    }
    // eslint-disable-next-line no-underscore-dangle
    this._notes.splice(idx, 1);
  }
}
module.exports = NotesService;
