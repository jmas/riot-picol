(function() {

  riot.mount('app', {
    items: [
        { url: 'images/1.jpg', palette: [{ color: 'ff0000', name: 'Red' }, { color: '0000ff', name: 'Blue' }, { color: 'ffff00', name: 'Yellow' }] },
        { url: 'images/1.jpg', palette: [{ color: 'ff0000', name: 'Red' }, { color: '0000ff', name: 'Blue' }, { color: 'ffff00', name: 'Yellow' }] },
        { url: 'images/1.jpg', palette: [{ color: '00ff00', name: 'Red' }, { color: '000000', name: 'Black' }, { color: 'ffa500', name: 'Orange' }] },
        { url: 'images/1.jpg', palette: [{ color: 'ff0000', name: 'Red' }, { color: '0000ff', name: 'Blue' }, { color: 'ffff00', name: 'Yellow' }] },
        { url: 'images/1.jpg', palette: [{ color: 'ff0000', name: 'Red' }, { color: '0000ff', name: 'Blue' }, { color: 'ffff00', name: 'Yellow' }] },
        { url: 'images/1.jpg', palette: [{ color: 'ff0000', name: 'Red' }, { color: '0000ff', name: 'Blue' }, { color: 'ffff00', name: 'Yellow' }] }
    ]
  });

  riot.util.color = {
    makeContrastColor: function(color) {
      return (this.luma(color) >= 165) ? '000' : 'fff';
    },
    luma: function(color) {
      var rgb = (typeof color === 'string') ? this.hexToRGBArray(color) : color;
      return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]); // SMPTE C, Rec. 709 weightings
    },
    hexToRGBArray: function(color) {
      if (color.length === 3)
          color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
      else if (color.length !== 6)
          throw('Invalid hex color: ' + color);
      var rgb = [];
      for (var i = 0; i <= 2; i++)
          rgb[i] = parseInt(color.substr(i * 2, 2), 16);
      return rgb;
    }
  };

})();
