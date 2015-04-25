var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
