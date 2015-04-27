var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var multer = require('multer');
var compression = require('compression');

var config = require('./config');

var app = express();

console.log('Current env: ', app.get('env'));

var publicDirName = config.devPublicDirName;

// production
if (app.get('env') === 'production') {
  publicDirName = config.prodPublicDirName;

  // compression
  app.use(compression({
    filter: function shouldCompress(req, res) {
      if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
      }

      // fallback to standard filter function
      return compression.filter(req, res)
    }
  }));
}

app.use(multer({
  dest: path.join(__dirname, publicDirName, config.imagesUplodsPath),
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, publicDirName)));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (req.accepts('json')) {
      res.json({
        name: err.name || 'unknown',
        message: err.message || 'Unknown.',
        error: err
      });
    } else {
      res.render('error', {
        name: err.name || 'unknown',
        message: err.message || 'Unknown.',
        error: err
      });
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (req.accepts('json')) {
    res.json({
      name: err.name || 'unknown',
      message: err.message || 'Unknown.',
      error: err instanceof Error ? {}: err
    });
  } else {
    res.render('error', {
      name: err.name || 'unknown',
      message: err.message || 'Unknown.',
      error: err instanceof Error ? {}: err
    });
  }
});


module.exports = app;
