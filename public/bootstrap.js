(function() {

  // configure requirejs
  requirejs.config({
    paths: {
      helpers:              './helpers',
      // plugins for requirejs
      text:                 './bower_components/requirejs-plugins/lib/text',
      json:                 './bower_components/requirejs-plugins/src/json',
      // app helpers and classes etc.
      ColorThief:           './bower_components/color-thief/dist/color-thief.min',
      simpleAjaxUploader:   './bower_components/Simple-Ajax-Uploader/SimpleAjaxUploader.min',
      riot:                 './bower_components/riot/riot.min',
      tags:                 './tags'
      //,
      // js-data optional dependency
    //  'js-data-schema':      null, // or path/to/js-data-schema/dist/js-data-schema.js,
    //  'bluebird':            null, // bluebird is only used in Node.js,
    //   // js-data main
    //   JSData:               './bower_components/js-data/dist/js-data.min',
    //   JSDataDSHttpAdapter:  './bower_components/js-data-http/dist/js-data-http.min'
    },
    shim: {
      // simpleAjaxUploader: {
      //   exports: 'ss'
      // },
      ColorThief: {
        exports: 'ColorThief'
      },
      tags: {
        deps: ['helpers/color', 'ColorThief', 'simpleAjaxUploader']
      }
    }
  });

  // main definition
  require(['riot', 'helpers/color', 'tags', 'json!items-data.json'],
         function(riot, colorHelper, tags, itemsData) {

    // define helpers
    riot.helpers = {};
    riot.helpers.color = colorHelper;

    // app point for tags events
    riot.app = riot.observable();

    // mount app
    riot.mount('app', {
      imageUploadUrl: '/image/upload',
      items: itemsData
    });
  });

})();
