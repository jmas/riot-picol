(function() {

  // app config
  var config = {
    imageUploadUrl: '/image/upload',
    defaultRoute:   'image/all'
  };

  // requirejs config
  requirejs.config({
    paths: {
      // core components
      riot:                 './bower_components/riot/riot.min',
      tags:                 './tags',
      // dirs of app components
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
        // this definition is required because helpers are used by tags.
        // we should load helpers before tags
        deps: ['helpers/ui', 'helpers/router', 'helpers/color']
      }
    }
  });

  // main: include and run
  define(['riot', 'tags', 'helpers/ui', 'helpers/router', 'helpers/color'],
          function(riot, tags, uiHelper, routerHelper, colorHelper) {
    // app point for dispatch events
    riot.app = riot.observable();

    // assign config
    riot.app.config = config;

    // assign helpers
    riot.app.helpers = {
      ui:     uiHelper,
      router: routerHelper,
      color:  colorHelper
    };

    // other: watch dialigs
    watchDialogsToControlScroll(riot);

    // mount app
    riot.mount('app');

    return riot;
  });

  // other: when we have more that one opened dialog we block scrolling
  function watchDialogsToControlScroll(riot) {
    var openedDialogsCount = 0;
    var bodyEl = document.getElementsByTagName('BODY')[0];
    // watch open
    riot.app.on('dialog:opened', function() {
      openedDialogsCount++;
      bodyEl.classList.add('app-dialog-opened');
    });
    // watch close
    riot.app.on('dialog:closed', function() {
      openedDialogsCount--;
      if (openedDialogsCount === 0) {
        bodyEl.classList.remove('app-dialog-opened');
      }
    });
  }

  // other: dummy for JSData
  define('js-data-schema', [], function () { return undefined; });
  define('bluebird', [], function () { return undefined; });

})();
