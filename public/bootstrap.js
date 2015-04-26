(function() {

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
        deps: ['helpers/color', 'helpers/ui']
      }
    }
  });

  // main definition
  require(['riot', 'helpers/color', 'helpers/ui', 'tags', 'JSData'],
         function(riot, colorHelper, uiHelper, tags, JSData) {

    // define helpers
    riot.helpers = {};
    riot.helpers.color = colorHelper;
    riot.helpers.ui = uiHelper;

    // app point for tags events
    riot.app = riot.observable();

    riot.app.config = {
      imageUploadUrl: '/image/upload'
    };

    watchDialogsToControlScroll(riot);

    // mount app
    riot.mount('layout');
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
