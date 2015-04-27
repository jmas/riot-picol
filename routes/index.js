var express = require('express');
var router = express.Router();
var imageService = require('../services/image');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/image', function(req, res, next) {
  imageService.findAll()
              .then(function(items) {
                console.log('items', items);
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
      name: req.files.file.name
    }
  });
});

module.exports = router;
