<image-item>
  <div class="image-item">
    <div class="image-preview" style="background-image: url({ url });"></div>
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
    width: 360px;
    height: 360px;
    background-position: center;
    background-size: cover;
  }

  .image-palette-item {
    height: 2em;
    line-height: 2em;
    margin-top: .5em;
    background-color: #eee;
    text-align: center;
  }
  </style>

  <script>
  var self = this;

  self.url = opts.url || '';
  self.palette = opts.palette || [];

  self.on('update', function() {
    self.palette.map(function(item) {
      item.contrastColor = riot.app.helpers.color.makeContrastColor(item.color);
      return item;
    });
  });
  </script>
</image-item>
