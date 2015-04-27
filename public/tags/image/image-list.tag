<image-list>
  <div class="image-list-empty" if={ items.length === 0}>
    Empty.
  </div>

  <div class="image-list" if={ items.length > 0 }>
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

  .image-list-empty {
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 1em;
    color: #888;
    border: 1px solid #eee;
    background-color: #fff;
    border-radius: .25em;
    text-align: center;
  }

  @media only screen and (max-device-width: 50em) {
    .image-list .image-item {
      display: block;
    }
  }
  </style>

  <script>
  var self = this;

  self.items = opts.items || [];
  </script>
</image-list>
