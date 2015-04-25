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
    background-color: #fff;
    overflow: hidden;
    border-radius: .25em;
  }

  .dialog-header {
    position: relative;
    padding: 1em;
    line-height: 1em;
    border-bottom: 1px solid #eee;
    background-color: #fafafa;
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
  </script>
</ui-dialog>
