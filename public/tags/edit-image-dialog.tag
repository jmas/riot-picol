<edit-image-dialog>
  <ui-dialog t="Edit Image">
    <form onsubmit={ parent.complete }>
      <div class="form-error" if={ parent.error }>{ parent.error }</div>
      <div class="form-item" if={ parent.fileName }>
        <div class="form-image-preview"></div>
      </div>
      <div class="form-item" if={ parent.imageUrl }>
        <image-item url={ parent.imageUrl } palette={ parent.imagePalette }></image-item>
      </div>
      <div class="form-buttons">
        <input class="form-submit-btn" type="submit" value="Complete" />
      </div>
    </form>
  </ui-dialog>

  <style>
  .form-image-preview {
    width: 350px;
    height: 350px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid #eee;
  }

  .form-error {
    color: red;
  }

  .form-image-palette-item {

  }
  </style>

  <script>
  var self = this;

  self.imageUrl = opts['image-url'] || null;
  self.imagePalette = opts['palette'] || [];
  self.error = null;

  open(newOpts) {
    self.tags['ui-dialog'].open();

    self.error = null;

    if (newOpts) {
      self.update(newOpts);
    } else {
      self.upade({
        imageUrl: '',
        imagePalette: []
      });
    }
  }

  close() {
    self.tags['ui-dialog'].close();
  }

  complete(event) {
    event.preventDefault();
    event.stopPropagation();

    self.close();

    if (self.imageUrl) {
      self.trigger('completed', {
        imageUrl: self.imageUrl,
        imagePalette: self.imagePalette
      });
    }
  }

  self.on('update', function() {
    if (self.imageUrl) {
      riot.helpers.color.getImagePaletteByUrl(self.imageUrl, 5, function(palette) {
        if (palette === null) {
            return self.update({
              imageUrl: '',
              imagePalette: [],
              error: 'Can\'t extract palette from current image.'
            });
        }
        self.imagePalette = palette;
        self.tags['ui-dialog'].tags['image-item'].update({
          url: self.imageUrl,
          palette: self.imagePalette
        });
      });
    }
  });
  </script>
</edit-image-dialog>
