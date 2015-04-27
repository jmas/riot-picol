var express = require('express');
var router = express.Router();
var imageService = require('../services/image');

router.get('/index', function(req, res, next) {
  // riot.render();
});

router.get('/image', function(req, res, next) {
  imageService.findAllOrderedByCreateAtDesc()
              .then(function(items) {
                res.json(items);
              })
              .catch(next);
});

router.post('/image', function(req, res, next) {
  imageService.save(req.body)
              .then(function(item) {
                res.json(item);
              })
              .catch(next);
});

router.post('/image/upload', function(req, res, next) {
  res.json({
    success: true,
    result: {
      url: '/uploads/images/' + req.files.file.name
    }
  });
});

module.exports = router;
