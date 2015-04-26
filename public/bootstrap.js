(function() {

  var config = {
    imageUploadUrl: '/image/upload',
    defaultRoute: 'image/all',
    helpers: [
      'color', 'ui', 'router'
    ]
  };

  var filesToRequire = ['riot', 'tags'];
  var argsShift = filesToRequire.length;
  var helpersToRequire = [];
  for (var i=0,ln=config.helpers.length; i<ln; i++) {
    helpersToRequire.push('helpers/' + config.helpers[i]);
    filesToRequire.push('helpers/' + config.helpers[i]);
  }

  // configure requirejs
  requirejs.config({
    paths: {
      // core components
      riot:                 './bower_components/riot/riot.min',
      tags:                 './tags',
      // components include dirs
      helpers:              './helpers',
      stores:               './stores',
      services:             './services',
      // other components
      ColorThief:           './bower_components/color-thief/dist/color-thief.min',
      simpleAjaxUploader:   './bower_components/Simple-Ajax-Uploader/SimpleAjaxUploader.min',
      JSData:               './bower_components/js-data/dist/js-data.min',
      // plugins for requirejs
      text:                 './bower_components/requirejs-plugins/lib/text',
      json:                 './bower_components/requirejs-plugins/src/json'
    },
    shim: {
      tags: {
        deps: helpersToRequire
      }
    }
  });

  // main definition
  require(filesToRequire, function(riot, tags) {
    // app point for tags events
    riot.app = riot.observable();

    // append helpers
    riot.app.helpers = {};
    for (var i=0,ln=config.helpers.length; i<ln; i++) {
      riot.app.helpers[config.helpers[i]] = arguments[i+argsShift];
    }

    riot.app.config = config;

    watchDialogsToControlScroll(riot);

    // mount app
    riot.mount('app');
  });

  // when we have more that one opened dialog we block scrolling
  function watchDialogsToControlScroll(riot) {
    var openedDialogsCount = 0;
    var bodyEl = document.getElementsByTagName('BODY')[0];

    riot.app.on('dialog:opened', function() {
      openedDialogsCount++;
      bodyEl.classList.add('app-dialog-opened');
    });

    riot.app.on('dialog:closed', function() {
      openedDialogsCount--;
      if (openedDialogsCount === 0) {
        bodyEl.classList.remove('app-dialog-opened');
      }
    });
  }

  // dummy for JSData
  define('js-data-schema', [], function () { return undefined; });
  define('bluebird', [], function () { return undefined; });

})();
