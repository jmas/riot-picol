<image-list>
  <div class="ui-message" if={ message }>{ message }</div>

  <div class="image-list" if={ items.length > 0 }>
    <image-item each={ items } url={ url } palette={ palette }></image-item>
  </div>

  <style>
  .image-list {
    text-align: center;
  }

  .image-list .image-item {
    display: inline-block;
    vertical-align: top;
    margin: 1em;
    text-align: left;
  }

  @media only screen and (max-device-width: 50em) {
    .image-list .image-item {
      display: block;
    }
  }
  </style>

  <script>
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
  </script>
</image-list>
