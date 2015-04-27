var imageRepo = require('../repos/image');

module.exports = {
  findAll: function() {
    return imageRepo.findAll();
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
