var store = require('../mongo-store');

module.exports = store.defineResource({
  name: 'image',
  // Why couldn't Mongo just use "id"?
  idAttribute: '_id',

  // map this resource to a collection, default is Resource#name
  table: 'image'
});
