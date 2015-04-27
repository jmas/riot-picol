define(['repos/image'], function() {
  var imageRepo = require('repos/image');
  
  var service = {
    findAll: function() {
      return imageRepo.findAll();
    },
    find: function(id) {
      return imageRepo.find(id);
    },
    remove: function(id) {
      return imageRepo.destroy(id);
    },
    save: function(data) {
      if ('_id' in data) {
        var id = data._id;
        delete data._id;
        return imageRepo.update(id, data);
      }
      return imageRepo.create(data);
    }
  };

  return service;
});
