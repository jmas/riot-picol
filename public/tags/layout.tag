<layout>
  <div class="layout">
    <div class="layout-nav">
      Navigation
    </div>
    <!--<div class="layout-side">
      Sidebar
    </div>-->
    <div class="layout-content" id="layout-content"></div>
  </div>

  <style>
  .layout {
    overflow: hidden;
  }

  .layout-nav {

  }

  .layout-side {
    float: left;
    width: 20em;
    margin-right: 2em;
  }

  .layout-content {
    overflow: hidden;
  }
  </style>

  <script>
  var self = this;
  self.mountedPage = null;

  renderRoute(collection, action, id) {
    if (! collection) {
      collection = 'image';
    }
    var tagName = collection + '-page';
    var el = document.createElement(tagName);
    self['layout-content'].appendChild(el);
    if (self.mountedPage) {
      for (var i=0,ln=self.mountedPage.length; i<ln; i++) {
        self.mountedPage[i].unmount(true);
      }
    }
    self.mountedPage = riot.mount(tagName);
    if (self.mountedPage.length === 0) {
      console.error('Page not found.');
    }
  }

  self.on('mount', function() {
    riot.route(self.renderRoute);
    riot.route.exec(self.renderRoute);
  });
  </script>
</layout>
