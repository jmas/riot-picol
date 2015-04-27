<ui-router>
  <script>
  var self = this;
  var mountedTags = null;
  var config = require('config');

  startDispatching() {
    riot.route(self.dispatch);
    riot.route.exec(self.dispatch);
  }

  dispatch(collection, action, id) {
    // check collection
    if (! collection) {
      return riot.route(config.defaultRoute);
    }
    // make new element
    var tagName = collection + '-page';
    var el = document.createElement(tagName);
    self.root.appendChild(el);
    // unmount old pages
    if (mountedTags) {
      for (var i=0,ln=mountedTags.length; i<ln; i++) {
        mountedTags[i].unmount();
      }
    }
    // try to mount new
    mountedTags = riot.mount(el);
    if (mountedTags.length === 0) {
      if (tagName !== 'not-found-page') {
        return self.dispatch('not-found');
      } else {
        throw new Error('Tag with name not-found-page is required for displaying Not Found page.');
      }
    }
    // trigger global event for notify app components
    if ('app' in riot) {
      riot.app.trigger('route.' + collection, action, id);
      riot.app.trigger('route', collection, action, id);
    }
  }

  self.on('mount', function() {
    self.startDispatching();
  });
  </script>
</ui-router>
