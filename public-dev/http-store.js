define(['js-data', 'js-data-http'], function() {
  var JSData = require('js-data');
  var DSHttpAdapter = require('js-data-http');
  var store = new JSData.DS();

  // register and use http by default for async operations
  store.registerAdapter('http', new DSHttpAdapter(), { default: true });

  return store;
});
