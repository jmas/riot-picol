define(['riot'], function(riot) {
  var viewportEl = null;
  var mountedTags = null;

  var router = {
    //
    startDispatching: function(el) {
      viewportEl = el;
      riot.route(router.dispatch);
      riot.route.exec(router.dispatch);
    },
    //
    dispatch: function(collection, action, id) {
      // check collection
      if (! collection) {
        if (! 'app' in riot) {
          return console.log('You need to define riot.app.config.defaultRoute.');
        }
        return riot.route(riot.app.config.defaultRoute);
      }
      // make new element
      var tagName = collection + '-page';
      var el = document.createElement(tagName);
      viewportEl.appendChild(el);
      // unmount old pages
      if (mountedTags) {
        for (var i=0,ln=mountedTags.length; i<ln; i++) {
          mountedTags[i].unmount();
        }
      }
      // try to mount new
      mountedTags = riot.mount(tagName);
      if (mountedTags.length === 0) {
        return router.dispatch('not-found');
      }
      if ('app' in riot) {
        riot.app.trigger('route:' + collection, action, id);
      }
    }
  };

  return router;
});
