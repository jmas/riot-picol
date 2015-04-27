(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot.tag('app', '<div class="app"> <div class="app-header"> <div class="app-nav"> <a href="#image" class="{ \'app-nav-item-active\': currentPage == \'image\' }">Images</a> <a href="#user" class="{ \'app-nav-item-active\': currentPage == \'user\' }">User</a> </div> </div> <div class="app-content"> <ui-router></ui-router> </div> </div>', '.app { overflow: hidden; } .app-header { padding: 1em; background-color: #fff; border-bottom: 1px solid #eee; line-height: 1em; } .app-nav { font-weight: bold; } .app-nav a { display: inline-block; padding: .5em; } .app-nav-item-active { color: #444; } .app-side { float: left; width: 20em; margin-right: 2em; } .app-content { overflow: hidden; padding: 1em; }', function(opts) {
  var self = this;

  self.currentPage = null;

  riot.app.on('route', function(page, action, id) {
    self.update({
      currentPage: page
    });
  });
  
});

riot.tag('image-edit-dialog', '<ui-dialog t="Edit Image"> <form onsubmit="{ parent.complete }"> <div class="form-error" if="{ parent.error }">{ parent.error }</div> <div class="form-item" if="{ parent.url }"> <div class="form-image-preview"></div> </div> <div class="form-item" if="{ parent.url }"> <image-item url="{ parent.url }" palette="{ parent.palette }"></image-item> </div> <div class="form-buttons"> <input class="form-submit-btn" type="submit" value="Complete"> </div> </form> </ui-dialog>', '.form-error { color: red; }', function(opts) {
  var self = this;
  var colorHelper = require('helpers/color');

  self.url = opts['url'] || null;
  self.palette = opts['palette'] || [];
  self.error = null;

  this.open = function(newOpts) {
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
  }.bind(this);

  this.close = function() {
    self.tags['ui-dialog'].close();
  }.bind(this);

  this.complete = function(event) {
    event.preventDefault();
    event.stopPropagation();

    self.close();

    if (self.url) {
      self.trigger('completed', {
        url: self.url,
        palette: self.palette
      });
    }
  }.bind(this);

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
  
});

riot.tag('image-item', '<div class="image-item"> <div class="image-preview"> <img riot-src="{ url }"> </div> <div class="image-palette"> <div each="{ palette }" class="image-palette-item" riot-style="background-color: #{ color }; color: #{ contrastColor };">{ name }</div> </div> </div>', '.image-item { border: 1px solid #eee; background-color: #fff; padding: .5em; border-radius: .25em; } .image-preview { background-position: center; background-size: cover; } .image-preview img { width: 100%; } .image-palette-item { height: 2em; line-height: 2em; margin-top: .5em; background-color: #eee; text-align: center; } @media only screen and (min-device-width: 50em) { .image-item { width: 360px; } }', function(opts) {
  var self = this;
  var colorHelper = require('helpers/color');

  self.url = opts.url || '';
  self.palette = opts.palette || [];

  self.on('update', function() {
    self.palette.map(function(item) {
      item.contrastColor = colorHelper.makeContrastColor(item.color);
      return item;
    });
    if (self.url) {
      var imagePreviewEl = self.root.querySelector('.image-preview');
      imagePreviewEl.innerHTML = '<img src="' + self.url + '" />';
    }
  });
  
});

riot.tag('image-list', '<div class="ui-message" if="{ message }">{ message }</div> <div class="image-list" if="{ items.length > 0 }"> <image-item each="{ items }" url="{ url }" palette="{ palette }"></image-item> </div>', '.image-list { text-align: center; } .image-list .image-item { display: inline-block; vertical-align: top; margin: 1em; text-align: left; } @media only screen and (max-device-width: 50em) { .image-list .image-item { display: block; } }', function(opts) {
  var self = this;

  self.message = null;
  self.items = opts.items || [];

  self.on('update', function() {
    if (self.items.length === 0) {
      self.message = 'Empty.';
    } else {
      self.message = null;
    }
  });
  
});

riot.tag('image-page', '<button onclick="{ addImage }">Add Image</button> <div class="ui-loading" if="{ loading }"></div> <div class="ui-message" if="{ error }">{ error }</div> <div if="{ ! loading && ! error }"> <image-list items="{ items }"></image-list> </div> <image-upload-dialog upload-url="{ uploadUrl }"></image-upload-dialog> <image-edit-dialog></image-edit-dialog>', function(opts) {
  var self = this;
  var imageService = require('services/image');
  var config = require('config');

  self.error = null;
  self.loading = false;
  self.items = opts.items || [];
  self.uploadUrl = config.imageUploadUrl || '/image/upload';

  this.addImage = function() {
    self.uploadImage();
  }.bind(this);

  this.uploadImage = function() {
    self.tags['image-upload-dialog'].open();
    riot.app.trigger('image:upload');
  }.bind(this);

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
  
});

riot.tag('image-upload-dialog', '<ui-dialog t="Upload Image"> <form onsubmit="{ parent.complete }"> <div class="form-item"> <button class="upload-file-btn">Choose File</button> </div> <div class="form-item" if="{ parent.url }"> <div class="form-image-preview"></div> </div> <div class="form-buttons"> <input class="form-submit-btn" type="submit" value="Complete"> </div> </form> </ui-dialog>', '.form-image-preview { width: 360px; } .form-image-preview img { width: 100%; }', function(opts) {
  var self = this;
  var uploader = null;
  var uiHelper = require('helpers/ui');

  self.url = opts['data'] ? opts['data'].url: null;
  self.uploadUrl = opts['upload-url'] || '/image/upload';
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

    if (self.url) {
      self.trigger('completed', {
        url: self.url
      });
    }

    self.close();
  }.bind(this);

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

  this.initUploader = function() {
    uploader = new uiHelper.FileUploader({
        button: self.root.querySelector('.upload-file-btn'),
        url: self.uploadUrl,
        multipart: true,
        responseType: 'json',

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
  }.bind(this);
  
});

riot.tag('not-found-page', '<h1>Page not found</h1> <p>Back to <a href="#{ homeRoute }" onclick="{ goHome }">main page</a>.</p>', function(opts) {
  var self = this;
  var config = require('config');

  self.homeRoute = config.defaultRoute;

  this.goHome = function(e) {
    e.preventDefault();
    e.stopPropagation();

    riot.route(self.homeRoute);
  }.bind(this);
  
});

riot.tag('ui-dialog', '<div class="dialog" if="{ showed }"> <div class="dialog-overlay" onclick="{ close }"></div> <div class="dialog-box"> <div class="dialog-header"> <div class="dialog-title">{ title }</div> <div class="dialog-close" onclick="{ close }">&times;</div> </div> <div class="dialog-content"> <yield ></yield> </div> </div> </div>', '.dialog { position: fixed; top: 0; left: 0; width: 100%; height: 100%; overflow: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; background-color: rgba(0, 0, 0, .5); } .dialog-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; } .dialog-box { position: relative; margin: 3em auto; max-width: 50em; background-color: #fafafa; overflow: hidden; border-radius: .25em; } .dialog-header { position: relative; padding: 1em; line-height: 1em; border-bottom: 1px solid #eee; background-color: #fff; } .dialog-title { font-weight: bold; } .dialog-close { position: absolute; top: 0; right: 0; padding: 1rem; font-size: 1.6em; line-height: .95rem; cursor: pointer; } .dialog-content { padding: 1em; } @media only screen and (max-device-width: 50em) { .dialog-box { margin-top: 0; margin-bottom: 0; border-radius: 0; min-height: 100%; } }', function(opts) {
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

riot.tag('ui-router', '', function(opts) {
  var self = this;
  var mountedTags = null;
  var config = require('config');

  this.startDispatching = function() {
    riot.route(self.dispatch);
    riot.route.exec(self.dispatch);
  }.bind(this);

  this.dispatch = function(page, action, id) {

    if (! page) {
      return riot.route(config.defaultRoute);
    }

    var tagName = page + '-page';
    var el = document.createElement(tagName);
    self.root.appendChild(el);

    if (mountedTags) {
      for (var i=0,ln=mountedTags.length; i<ln; i++) {
        mountedTags[i].unmount();
      }
    }

    mountedTags = riot.mount(el);
    if (mountedTags.length === 0) {
      if (tagName !== 'not-found-page') {
        return self.dispatch('not-found');
      } else {
        throw new Error('Tag with name not-found-page is required for displaying Not Found page.');
      }
    }

    if ('app' in riot) {
      riot.app.trigger('route.' + page, action, id);
      riot.app.trigger('route', page, action, id);
    }
  }.bind(this);

  self.on('mount', function() {
    self.startDispatching();
  });
  
});

riot.tag('user-page', '<h1>Hello, user!</h1>', function(opts) {

});

});