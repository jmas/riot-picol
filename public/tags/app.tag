<app>
  <button onclick={ addImage }>Add Image</button>

  <image-list items={ items }></image-list>

  <upload-image-dialog image-upload-url="{ imageUploadUrl }"></upload-image-dialog>
  <edit-image-dialog></edit-image-dialog>

  <style>
  .app-dialog-opened {
    overflow: hidden;
  }
  </style>

  <script>
  var self = this;
  var openedDialogsCount = 0;
  var bodyEl = document.getElementsByTagName('BODY')[0];

  self.items = opts.items || [];
  self.imageUploadUrl = opts.imageUploadUrl || '/image/upload';

  addImage() {
    self.uploadImage();
  }

  uploadImage() {
    self.tags['upload-image-dialog'].open();
    riot.app.trigger('image:upload');
  }

  self.tags['upload-image-dialog'].on('completed', function(data) {
    self.tags['edit-image-dialog'].open({
      imageUrl: '/images/' + data.fileName,
      imagePalette: []
    });
  });

  self.tags['edit-image-dialog'].on('completed', function(data) {
    console.log('edit image dialog result: ', data);
  });

  riot.app.on('dialog:opened', function() {
    openedDialogsCount++;
    bodyEl.classList.add('app-dialog-opened');
  });

  riot.app.on('dialog:closed', function() {
    openedDialogsCount--;
    if (openedDialogsCount === 0) {
      bodyEl.classList.remove('app-dialog-opened');
    }
  });
  </script>
</app>
