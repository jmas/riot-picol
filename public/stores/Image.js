define(['JSData', 'JSDataDSHttpAdapter'], function(JSData, JSDataDSHttpAdapter) {
  var store = new JSData.DS();

  // register and use http by default for async operations
  store.registerAdapter('http', new JSDataDSHttpAdapter(), { default: true });

  return store.defineResource('image');
});
