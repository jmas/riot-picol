<app>
  <div class="app">
    <div class="app-header">
      <div class="app-nav">
        <a href="#image" class={ 'app-nav-item-active': currentCollection == 'image' }>Images</a>
        <a href="#user" class={ 'app-nav-item-active': currentCollection == 'user' }>User</a>
      </div>
    </div>
    <!--<div class="app-side">
      Sidebar
    </div>-->
    <div class="app-content">
      <ui-router></ui-router>
    </div>
  </div>

  <style>
  .app {
    overflow: hidden;
  }

  .app-header {
    padding: 1em;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    line-height: 1em;
  }

  .app-nav {
    font-weight: bold;
  }

  .app-nav a {
    display: inline-block;
    padding: .5em;
  }

  .app-nav-item-active {
    color: #444;
  }

  .app-side {
    float: left;
    width: 20em;
    margin-right: 2em;
  }

  .app-content {
    overflow: hidden;
    padding: 1em;
  }
  </style>

  <script>
  var self = this;

  self.currentCollection = null;

  riot.app.on('route', function(collection, action, id) {
    self.update({
      currentCollection: collection
    });
  });
  </script>
</app>
