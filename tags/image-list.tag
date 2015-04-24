<image-list>
  <image-item each={ items } src={ src } palette={ palette }></image-item>

  <style>
    .image-list .image-item {
      float: left;
      margin: 1em;
    }
  </style>

  <script>
  var self = this;

  self.items = opts.items || [];
  </script>
</image-list>
