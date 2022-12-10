// const {
//   addNoteHandler,
//   getAllNotesHandler,
//   getNoteByIdHandler,
//   editNoteByIdHandle,
//   deletedByIdHandler,
// } = require('./handler');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler, // postNoteHandler hanya menerima dan menyimpan "satu" note.
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler, // getNotesHandler mengembalikan banyak note.
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler, // getNoteByIdHandler mengebalikan satu note.
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler, // putNoteByIdHandler mengubah hanya satu data saja.
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    // eslint-disable-next-line max-len
    handler: handler.deleteNoteByIdHandler, // deleteNoteByIdHandler menghapus data hanya satu data saja.
    options: {
      auth: 'notesapp_jwt',
    },
  },
];

module.exports = routes;
