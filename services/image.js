var imageRepo = require('../repos/image');

module.exports = {
  findAll: function() {
    return imageRepo.findAll();
  },
  findAllOrderedByCreateAtDesc: function() {
    return imageRepo.findAll({
                      orderBy: [
                        ['createAt', 'DESC']
                      ]
                    });
  },
  save: function(data) {
    if ('_id' in data) {
      var id = data._id;
      delete data._id;
      return imageRepo.update(id, data);
    }
    data.createAt = new Date();
    return imageRepo.create(data);
  }
};
