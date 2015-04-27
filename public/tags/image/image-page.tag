<image-page>
  <button onclick={ addImage }>Add Image</button>

  <div class="image-page-error" if={ error }>
    { error }
  </div>

  <image-list items={ items } if={ ! error }></image-list>

  <image-upload-dialog image-upload-url="{ imageUploadUrl }"></image-upload-dialog>
  <image-edit-dialog></image-edit-dialog>

  <style>
  .image-page-error {
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 1em;
    color: red;
    border: 1px solid red;
    background-color: #fff;
    border-radius: .25em;
    text-align: center;
  }
  </style>

  <script>
  var self = this;
  var imageService = require('services/image');

  self.error = null;
  self.items = opts.items || [];
  self.imageUploadUrl = '/image/upload';

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
    imageService.findAll()
                .then(function(items) {
                  self.tags['image-list'].update({
                    items: items
                  });
                })
                .catch(function(e) {
                  self.update({
                    error: 'Can\'t load data from server.'
                  });
                });
  });
  </script>
</image-page>
