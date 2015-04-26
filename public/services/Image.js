define(['stores/Image'], function(ImageStore) {

  var service = {
    findAll: function() {
      return ImageStore.findAll();
    },
    find: function(id) {
      return ImageStore.find();
    },
    remove: function(id) {
      return ImageStore.destroy(id);
    },
    save: function(data) {

    }
  };

  return service;

});
