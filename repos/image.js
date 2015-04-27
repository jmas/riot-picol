var store = require('../mongo-store');

module.exports = store.defineResource({
  name: 'image',
  idAttribute: '_id',

  schema: {
    url: {
      type: 'string',
      maxLength: 255,
      nullable: false
    },
    palette: {
      type: 'array',
      nullable: false
    },
    createAt: {
      type: 'date',
      nullable: false
    }
  }
});
