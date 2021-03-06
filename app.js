var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var config = require('./config');

var routes = require('./routes/index');
var users = require('./routes/users');
var image = require('./routes/image');

var app = express();

// production
if (app.get('env') === 'production') {
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

var publicDirName = (app.get('env') === 'production' ? 'public-prod': 'public-dev');

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
app.use('/image', image);

app.use('/image', express.static(path.join(__dirname, config.imagesUplodsPath)));

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
