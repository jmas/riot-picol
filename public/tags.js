riot.tag('app', '<button onclick="{ addImage }">Add Image</button> <image-list items="{ items }"></image-list> <upload-image-dialog image-upload-url="{ imageUploadUrl }"></upload-image-dialog>', '.app-dialog-opened { overflow: hidden; }', function(opts) {
  var self = this;
  var openedDialogsCount = 0;
  var bodyEl = document.getElementsByTagName('BODY')[0];

  self.items = opts.items || [];
  self.imageUploadUrl = opts.imageUploadUrl || '/image/upload';

  this.addImage = function() {
    self.uploadImage();
  }.bind(this);

  this.uploadImage = function() {
    self.tags['upload-image-dialog'].open();
    riot.app.trigger('image:upload');
  }.bind(this);

  self.tags['upload-image-dialog'].on('completed', function(data) {
    console.log('Data is uploaded', data);
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
  
});

riot.tag('image-item', '<div class="image-item"> <div class="image-preview" riot-style="background-image: url({ imageUrl });"></div> <div class="image-palette"> <div each="{ palette }" class="image-palette-item" riot-style="background-color: #{ color }; color: #{ contrastColor };">{ name }</div> </div> </div>', '.image-item { border: 1px solid #eee; background-color: #fff; padding: .5em; border-radius: .25em; } .image-preview { width: 360px; height: 360px; background-position: center; background-size: cover; } .image-palette-item { height: 2em; line-height: 2em; margin-top: .5em; background-color: #eee; text-align: center; }', function(opts) {
  var self = this;

  self.imageUrl = opts.url || '';
  self.palette = opts.palette || [];

  self.palette.map(function(item) {
    item.contrastColor = riot.util.color.makeContrastColor(item.color);
    return item;
  });
  
});

riot.tag('image-list', '<div class="image-list"> <image-item each="{ items }" url="{ url }" palette="{ palette }"></image-item> </div>', '.image-list { /*overflow: hidden;*/ text-align: center; } .image-list .image-item { display: inline-block; vertical-align: top; margin: 1em; text-align: left; }', function(opts) {
  var self = this;

  self.items = opts.items || [];
  
});

riot.tag('ui-dialog', '<div class="dialog" if="{ showed }"> <div class="dialog-overlay" onclick="{ close }"></div> <div class="dialog-box"> <div class="dialog-header"> <div class="dialog-title">{ title }</div> <div class="dialog-close" onclick="{ close }">&times;</div> </div> <div class="dialog-content"> <yield ></yield> </div> </div> </div>', '.dialog { position: fixed; top: 0; left: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0, 0, 0, .5); } .dialog-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; } .dialog-box { position: relative; margin: 3em auto; max-width: 50em; background-color: #fff; overflow: hidden; border-radius: .25em; } .dialog-header { position: relative; padding: 1em; line-height: 1em; border-bottom: 1px solid #eee; background-color: #fafafa; } .dialog-title { font-weight: bold; } .dialog-close { position: absolute; top: 0; right: 0; padding: 1rem; font-size: 1.6em; line-height: .95rem; cursor: pointer; } .dialog-content { padding: 1em; }', function(opts) {
  var self = this;

  self.showed = opts.showed || false;
  self.title = opts.t || '';

  this.open = function() {
    self.showed = true;
    if ('app' in riot) {
      riot.app.trigger('dialog:opened');
    }
  }.bind(this);

  this.close = function() {
    self.showed = false;
    if ('app' in riot) {
      riot.app.trigger('dialog:closed');
    }
  }.bind(this);
  
});

riot.tag('upload-image-dialog', '<ui-dialog t="Upload Image"> <form onsubmit="{ parent.complete }"> <div class="form-item"> <button class="upload-file-btn">Choose File</button> </div> <div class="form-item" if="{ parent.fileName }"> <div class="form-image-preview"></div> </div> <div class="form-buttons"> <input class="form-submit-btn" type="submit" value="Complete"> </div> </form> </ui-dialog>', '.form-image-preview { width: 350px; height: 350px; background-position: center; background-repeat: no-repeat; background-size: cover; border: 1px solid #eee; }', function(opts) {
  var self = this;
  var uploader = null;

  self.fileName = opts['data'] ? opts['data'].fileName: null;
  self.imageUploadUrl = opts['image-upload-url'] || '/image/upload';
  self.inProgress = false;

  this.open = function() {
    self.tags['ui-dialog'].open();
  }.bind(this);

  this.close = function() {
    self.tags['ui-dialog'].close();
  }.bind(this);

  this.complete = function(event) {
    event.preventDefault();
    event.stopPropagation();

    var data = {
      fileName: self.fileName
    };

    if (self.fileName) {
      self.trigger('completed', data);
    }

    self.close();
  }.bind(this);

  this.initUploader = function() {
    uploader = new ss.SimpleUpload({
        button: self.root.querySelector('.upload-file-btn'),
        url: self.imageUploadUrl,
        multipart: true,
        responseType: 'json',

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
  }.bind(this);

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
  
});
