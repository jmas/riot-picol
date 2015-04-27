<image-page>
  <button onclick={ addImage }>Add Image</button>

  <div class="ui-loading" if={ loading }></div>
  <div class="ui-message" if={ error }>{ error }</div>

  <div if={ ! loading && ! error }>
    <image-list items={ items }></image-list>
  </div>

  <image-upload-dialog upload-url="{ uploadUrl }"></image-upload-dialog>
  <image-edit-dialog></image-edit-dialog>

  <style>
  </style>

  <script>
  var self = this;
  var imageService = require('services/image');
  var config = require('config');

  self.error = null;
  self.loading = false;
  self.items = opts.items || [];
  self.uploadUrl = config.imageUploadUrl || '/image/upload';

  addImage() {
    self.uploadImage();
  }

  uploadImage() {
    self.tags['image-upload-dialog'].open();
    riot.app.trigger('image:upload');
  }

  self.tags['image-upload-dialog'].on('completed', function(data) {
    self.tags['image-edit-dialog'].open(data);
  });

  self.tags['image-edit-dialog'].on('completed', function(data) {
    imageService.save(data)
                .then(function(item) {
                  self.items.unshift(item);
                  self.update();
                })
                .catch(function(e) {
                  self.update({
                    loading: false,
                    error: 'Can\'t save image.'
                  });
                });
  });

  self.on('update', function() {
    self.tags['image-list'].update({
      items: self.items
    });
  });

  self.on('mount', function() {
    riot.route.exec(function(page, action, id) {
      self.update({ loading: true });

      imageService.findAll()
                  .then(function(items) {
                    self.update({
                      loading: false,
                      items: items
                    });
                  })
                  .catch(function(e) {
                    self.update({
                      loading: false,
                      error: 'Can\'t load data from server.'
                    });
                  });
    });
  });
  </script>
</image-page>
