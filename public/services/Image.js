define(['stores/image'], function(imageStore) {

  var service = {
    findAll: function() {
      return imageStore.findAll();
    },
    find: function(id) {
      return imageStore.find();
    },
    remove: function(id) {
      return imageStore.destroy(id);
    },
    save: function(data) {

    }
  };

  return service;

});
