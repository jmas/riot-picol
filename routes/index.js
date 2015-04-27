var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/image', function(req, res, next) {
  // res.status(503);
  res.json([
      {
        "id": 1,
        "url": "images/1.jpg",
        "palette": [
          { "color": "ff0000", "name": "Red" },
          { "color": "ff0000", "name": "Red" },
          { "color": "0000ff", "name": "Blue" },
          { "color": "ffff00", "name": "Yellow" }
        ]
      },
      {
        "id": 2,
        "url": "images/1.jpg",
        "palette": [
          { "color": "ff0000", "name": "Red" },
          { "color": "0000ff", "name": "Blue" },
          { "color": "ffff00", "name": "Yellow" }
        ]
      },
      {
        "id": 3,
        "url": "images/1.jpg",
        "palette": [
          { "color": "00ff00", "name": "Green" },
          { "color": "000000", "name": "Black" },
          { "color": "ffa500", "name": "Orange" }
        ]
      },
      {
        "id": 4,
        "url": "images/1.jpg",
        "palette": [
          { "color": "ff0000", "name": "Red" },
          { "color": "0000ff", "name": "Blue" },
          { "color": "ffff00", "name": "Yellow" }
        ]
      },
      {
        "id": 5,
        "url": "images/1.jpg",
        "palette": [
          { "color": "ff0000", "name": "Red" },
          { "color": "0000ff", "name": "Blue" },
          { "color": "ffff00", "name": "Yellow" }
        ]
      },
      {
        "id": 6,
        "url": "images/1.jpg",
        "palette": [
          { "color": "ff0000", "name": "Red" },
          { "color": "0000ff", "name": "Blue" },
          { "color": "ffff00", "name": "Yellow" }
        ]
      }
  ]);
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
