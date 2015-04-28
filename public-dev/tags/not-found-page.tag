<not-found-page>
  <h1>Page not found</h1>
  <p>Back to <a href="#{ homeRoute }" onclick={ goHome }>main page</a>.</p>

  <script>
  var self = this;
  var config = require('config');

  self.homeRoute = config.defaultRoute;

  goHome(e) {
    e.preventDefault();
    e.stopPropagation();

    riot.route(self.homeRoute);
  }
  </script>
</not-found-page>
