<image-list>
  <div class="image-list">
    <image-item each={ items } url={ url } palette={ palette }></image-item>
  </div>

  <style>
  .image-list {
    /*overflow: hidden;*/
    text-align: center;
  }

  .image-list .image-item {
    display: inline-block;
    vertical-align: top;
    margin: 1em;
    text-align: left;
  }
  </style>

  <script>
  var self = this;

  self.items = opts.items || [];
  </script>
</image-list>
