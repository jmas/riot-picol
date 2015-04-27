var JSData = require('js-data');
var DSMongoDBAdapter = require('js-data-mongodb');

var store = new JSData.DS();
var adapter = new DSMongoDBAdapter('mongodb://localhost:27017/picol');

store.registerAdapter('mongodb', adapter, { default: true });

module.exports = store;
