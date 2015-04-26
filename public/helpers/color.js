define(['ColorThief'], function(ColorThief) {

  var utils = {
    // can make contrast color
    makeContrastColor: function(color) {
      return (utils.luma(color) >= 165) ? '000' : 'fff';
    },
    // calculate somesing ?
    luma: function(color) {
      var rgb = (typeof color === 'string') ? utils.hexToRGBArray(color) : color;
      return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]); // SMPTE C, Rec. 709 weightings
    },
    // hex to rgb
    hexToRGBArray: function(color) {
      if (color.length === 3)
          color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
      else if (color.length !== 6)
          throw('Invalid hex color: ' + color);
      var rgb = [];
      for (var i = 0; i <= 2; i++)
          rgb[i] = parseInt(color.substr(i * 2, 2), 16);
      return rgb;
    },
    // rgb to hex
    rgbToHex: function(r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    // grab image colors palette
    getImagePaletteByUrl: function(imageUrl, paletteCount, callback) {
      var image = new Image;
      image.onload = function() {
        try {
          var palette = utils.colorThief.getPalette(image, paletteCount, 100);
        } catch(e) {
          return callback(null);
        }
        palette = palette.map(function(item) {
          return {
            color: utils.rgbToHex.apply(null, item),
            name: utils.rgbToHex.apply(null, item)
          };
        });
        callback(palette);
      };
      image.src = imageUrl;
    }
  };

  // add ColorThief instance
  utils.colorThief = new ColorThief();

  return utils;
});
