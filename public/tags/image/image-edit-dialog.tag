<image-edit-dialog>
  <ui-dialog t="Edit Image">
    <form onsubmit={ parent.complete }>
      <div class="form-error" if={ parent.error }>{ parent.error }</div>
      <div class="form-item" if={ parent.url }>
        <div class="form-image-preview"></div>
      </div>
      <div class="form-item" if={ parent.url }>
        <image-item url={ parent.url } palette={ parent.palette }></image-item>
      </div>
      <div class="form-buttons">
        <input class="form-submit-btn" type="submit" value="Complete" />
      </div>
    </form>
  </ui-dialog>

  <style>
  .form-error {
    color: red;
  }
  </style>

  <script>
  var self = this;
  var colorHelper = require('helpers/color');

  self.url = opts['url'] || null;
  self.palette = opts['palette'] || [];
  self.error = null;

  open(newOpts) {
    self.tags['ui-dialog'].open();

    self.error = null;

    if (newOpts) {
      self.update(newOpts);
    } else {
      self.upade({
        url: '',
        palette: []
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

    if (self.url) {
      self.trigger('completed', {
        url: self.url,
        palette: self.palette
      });
    }
  }

  self.on('update', function() {
    if (self.url) {
      colorHelper.getImagePaletteByUrl(self.url, 5, function(palette) {
        if (palette === null) {
            return self.update({
              url: '',
              palette: [],
              error: 'Can\'t extract palette from current image.'
            });
        }
        self.palette = palette;
        self.tags['ui-dialog'].tags['image-item'].update({
          url: self.url,
          palette: self.palette
        });
      });
    }
  });
  </script>
</image-edit-dialog>
