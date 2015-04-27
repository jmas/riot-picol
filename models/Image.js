var store = require('../store');

module.exports = store.defineResource({
  // Why couldn't Mongo just use "id"?
  idAttribute: '_id',
  // map this resource to a collection, default is Resource#name
  table: 'image'
});
