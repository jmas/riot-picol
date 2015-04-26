<app>
  <div class="layout">
    <div class="layout-nav">
      <a href="#image">Images</a>
      <a href="#user">User</a>
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

  self.on('mount', function() {
    riot.app.helpers.router.startDispatching(this['layout-content']);
  });
  </script>
</app>
