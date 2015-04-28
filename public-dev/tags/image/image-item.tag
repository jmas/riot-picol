<image-item>
  <div class="image-item">
    <div class="image-preview">
      <img src="{ url }" />
    </div>
    <div class="image-palette">
      <div each={ palette } class="image-palette-item" style="background-color: #{ color }; color: #{ contrastColor };">{ name }</div>
    </div>
  </div>

  <style>
  .image-item {
    border: 1px solid #eee;
    background-color: #fff;
    padding: .5em;
    border-radius: .25em;
  }

  .image-preview {
    background-position: center;
    background-size: cover;
  }

  .image-preview img {
    width: 100%;
  }

  .image-palette-item {
    height: 2em;
    line-height: 2em;
    margin-top: .5em;
    background-color: #eee;
    text-align: center;
  }

  @media only screen and (min-device-width: 50em) {
    .image-item {
      width: 360px;
    }
  }
  </style>

  <script>
  var self = this;
  var colorHelper = require('helpers/color');

  self.url = opts.url || '';
  self.palette = opts.palette || [];

  self.on('update', function() {
    self.palette.map(function(item) {
      item.contrastColor = colorHelper.makeContrastColor(item.color);
      return item;
    });
    if (self.url) {
      var imagePreviewEl = self.root.querySelector('.image-preview');
      imagePreviewEl.innerHTML = '<img src="' + self.url + '" />';
    }
  });
  </script>
</image-item>
