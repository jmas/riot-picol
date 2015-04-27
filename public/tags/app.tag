<app>
  <div class="app">
    <div class="app-nav">
      <a href="#image">Images</a>
      <a href="#user">User</a>
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

  .app-nav {
    padding: 1em;
    background-color: #fff;
  }

  .app-nav a {
    margin-left: .5em;
    margin-right: .5em;
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
</app>
