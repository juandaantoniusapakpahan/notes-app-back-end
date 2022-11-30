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
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler, // getNotesHandler mengembalikan banyak note.
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler, // getNoteByIdHandler mengebalikan satu note.
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler, // putNoteByIdHandler mengubah hanya satu data saja.
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    // eslint-disable-next-line max-len
    handler: handler.deleteNoteByIdHandler, // deleteNoteByIdHandler menghapus data hanya satu data saja.
  },
];

module.exports = routes;
