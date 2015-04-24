<image-item>
  <div class="image-item">
    <div class="image-preview" style="background-image: url({ imageUrl });"></div>
    <div class="image-palette">
      <div each={ palette } class="image-palette-item" style="background-color: { color };">{ name }</div>
    </div>
  </div>

  <style>
  .image-item {

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
  }
  </style>

  <script>
  var self = this;

  console.log(opts);

  self.imageUrl = opts.src || '';
  self.palette = opts.palette || [];
  </script>
</image-item>
