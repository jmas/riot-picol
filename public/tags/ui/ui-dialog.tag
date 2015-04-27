<ui-dialog>
  <div class="dialog" if={ showed }>
    <div class="dialog-overlay" onclick={ close }></div>
    <div class="dialog-box">
      <div class="dialog-header">
        <div class="dialog-title">{ title }</div>
        <div class="dialog-close" onclick={ close }>&times;</div>
      </div>
      <div class="dialog-content">
        <yield />
      </div>
    </div>
  </div>

  <style>
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    background-color: rgba(0, 0, 0, .5);
  }

  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .dialog-box {
    position: relative;
    margin: 3em auto;
    max-width: 50em;
    background-color: #fafafa;
    overflow: hidden;
    border-radius: .25em;
  }

  .dialog-header {
    position: relative;
    padding: 1em;
    line-height: 1em;
    border-bottom: 1px solid #eee;
    background-color: #fff;
  }

  .dialog-title {
    font-weight: bold;
  }

  .dialog-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    font-size: 1.6em;
    line-height: .95rem;
    cursor: pointer;
  }

  .dialog-content {
    padding: 1em;
  }

  @media only screen and (max-device-width: 50em) {
    .dialog-box {
      margin-top: 0;
      margin-bottom: 0;
      border-radius: 0;
      min-height: 100%;
    }
  }
  </style>

  <script>
  var self = this;


  self.showed = opts.showed || false;
  self.title = opts.t || '';

  open() {
    self.showed = true;
    if ('app' in riot) {
      riot.app.trigger('dialog:opened');
    }
  }

  close() {
    self.showed = false;
    if ('app' in riot) {
      riot.app.trigger('dialog:closed');
    }
  }

  prevent(event) {
    event.stopPropagation();
    // console.log(self.root);
    // self.root.addEventListener('touchmove', function(event){
    //     event.stopPropagation();
    // });
    // var dialogEl = self.root;
    // var preventScrollHandler = function(e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // };
    // //
    // dialogEl.addEventListener('touchmove', preventScrollHandler);
    // dialogEl.addEventListener('touchstart', preventScrollHandler);
  }
  </script>
</ui-dialog>
