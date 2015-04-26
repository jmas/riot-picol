<image-page>
  <button onclick={ addImage }>Add Image</button>

  <image-list items={ items }></image-list>

  <image-upload-dialog image-upload-url="{ imageUploadUrl }"></image-upload-dialog>
  <image-edit-dialog></image-edit-dialog>

  <script>
  var self = this;

  self.items = opts.items || [];
  self.imageUploadUrl = opts.imageUploadUrl || '/image/upload';

  addImage() {
    self.uploadImage();
  }

  uploadImage() {
    self.tags['image-upload-dialog'].open();
    riot.app.trigger('image:upload');
  }

  self.tags['image-upload-dialog'].on('completed', function(data) {
    self.tags['image-edit-dialog'].open({
      imageUrl: '/images/' + data.fileName,
      imagePalette: []
    });
  });

  self.tags['image-edit-dialog'].on('completed', function(data) {
    console.log('edit image dialog result: ', data);
  });

  self.on('mount', function() {
    require(['json!items-data.json'], function(items) {
      self.tags['image-list'].update({
        items: items
      });
    });
  });
  </script>
</image-page>
