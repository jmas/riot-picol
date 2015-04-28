(function() {

  // requirejs config
  requirejs.config({
    // urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
      // core components
      riot:                 './bower_components/riot/riot.min',
      config:               './config',
      tags:                 './tags',
      // folders of app components
      helpers:              './helpers',
      stores:               './stores',
      services:             './services',
      // other components here
      ColorThief:           './bower_components/color-thief/dist/color-thief.min',
      simpleAjaxUploader:   './bower_components/Simple-Ajax-Uploader/SimpleAjaxUploader.min',
      'js-data':            './bower_components/js-data/dist/js-data.min',
      'js-data-http':       './bower_components/js-data-http/dist/js-data-http.min'
    }
  });

  // main: include and run
  require([
    // core
    'riot',
    'config',
    'tags',
    // helpers
    'helpers/ui',
    'helpers/color',
    'helpers/globals',
    // services
    'services/image'
  ], function() {
    var riot = require('riot');
    var globalsHelper = require('helpers/globals');

    // app point for dispatch events
    riot.app = riot.observable();

    // other: watch dialigs
    globalsHelper.watchDialogsToControlScroll(riot);

    // mount app
    riot.mount('app');
  });

  // other: dummy for JSData
  define('js-data-schema', [], function () { return undefined; });
  define('bluebird', [], function () { return undefined; });

})();
