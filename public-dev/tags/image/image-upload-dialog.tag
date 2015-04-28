<image-upload-dialog>
  <ui-dialog t="Upload Image">
    <form onsubmit={ parent.complete }>
      <div class="form-item">
        <button class="upload-file-btn">Choose File</button>
      </div>
      <div class="form-item" if={ parent.url }>
        <div class="form-image-preview"></div>
      </div>
      <div class="form-buttons">
        <input class="form-submit-btn" type="submit" value="Complete" />
      </div>
    </form>
  </ui-dialog>

  <style>
  .form-image-preview {
    width: 360px;
  }

  .form-image-preview img {
    width: 100%;
  }
  </style>

  <script>
  var self = this;
  var uploader = null;
  var uiHelper = require('helpers/ui');

  self.url = opts['data'] ? opts['data'].url: null;
  self.uploadUrl = opts['upload-url'] || '/image/upload';
  self.inProgress = false;

  open() {
    self.tags['ui-dialog'].open();
  }

  close() {
    self.tags['ui-dialog'].close();
  }

  complete(event) {
    event.preventDefault();
    event.stopPropagation();

    if (self.url) {
      self.trigger('completed', {
        url: self.url
      });
    }

    self.close();
  }

  self.on('updated', function() {
    var previewEl = self.root.querySelector('.form-image-preview');
    if (self.url && previewEl) {
      previewEl.innerHTML = '<img src="' + self.url + '" />';
    }
    if (self.tags['ui-dialog'].showed) {
      self.root.querySelector('.form-submit-btn').disabled = (self.inProgress ? true: false);
    }
  });

  self.on('mount', function() {
    self.initUploader();
  });

  initUploader() {
    uploader = new uiHelper.FileUploader({
        button: self.root.querySelector('.upload-file-btn'),
        url: self.uploadUrl,
        multipart: true,
        responseType: 'json',
        // autoSubmit: false,
        onComplete: function(filename, response, uploadBtn) {
          self.update({
            url: response.result.url,
            inProgress: false
          });
        },
        onSubmit: function() {
          self.update({
            inProgress: true
          });
        },
        name: 'file'
    });
  }
  </script>
</image-upload-dialog>
