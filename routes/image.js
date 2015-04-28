var express = require('express');
var router = express.Router();
var imageService = require('../services/image');
var multer = require('multer');
var path = require('path');
var config = require('../config');

router.get('/', function(req, res, next) {
  imageService.findAllOrderedByCreateAtDesc()
              .then(function(items) {
                res.json(items);
              })
              .catch(next);
});

router.post('/', function(req, res, next) {
  imageService.save(req.body)
              .then(function(item) {
                res.json(item);
              })
              .catch(next);
});

router.post('/upload',
  [ multer({
      dest: path.join(__dirname, '..', config.imagesUplodsPath),
      rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
      }
    }) ],
  function(req, res, next) {
    res.json({
      success: true,
      result: {
        url: '/image/' + req.files.file.name
      }
    });
});

module.exports = router;
