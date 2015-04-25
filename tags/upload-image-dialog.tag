<upload-image-dialog>
  <ui-dialog t="Upload Image">
    <form onsubmit={ parent.complete }>
      <div class="form-item">
        <button class="upload-file-btn">Choose File</button>
      </div>
      <div class="form-item" if={ parent.fileName }>
        <div class="form-image-preview"></div>
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
  </style>

  <script>
  var self = this;
  var uploader = null;

  self.fileName = opts['data'] ? opts['data'].fileName: null;
  self.imageUploadUrl = opts['image-upload-url'] || '/image/upload';
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

    var data = {
      fileName: self.fileName
    };

    if (self.fileName) {
      self.trigger('completed', data);
    }

    self.close();
  }

  initUploader() {
    uploader = new ss.SimpleUpload({
        button: self.root.querySelector('.upload-file-btn'),
        url: self.imageUploadUrl,
        multipart: true,
        responseType: 'json',
        // autoSubmit: false,
        onComplete: function(filename, response, uploadBtn) {
          self.update({
            fileName: response.result.name,
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

  self.on('updated', function() {
    if (self.fileName) {
      var imagePreviewEl = self.root.querySelector('.form-image-preview');
      imagePreviewEl.style.backgroundImage = 'url("/images/' + self.fileName + '")';
    }
    if (self.tags['ui-dialog'].showed) {
      self.root.querySelector('.form-submit-btn').disabled = (self.inProgress ? true: false);
    }
  });

  self.on('mount', function() {
    self.initUploader();
  });
  </script>
</upload-image-dialog>
