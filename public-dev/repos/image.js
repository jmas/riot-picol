define(['http-store'], function() {
  var httpStore = require('http-store');

  return httpStore.defineResource({
    name: 'image',
    idAttribute: '_id'
  });
});
