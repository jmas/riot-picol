define(function() {
  var globals = {
    //
    watchDialogsToControlScroll: function(riot) {
      var openedDialogsCount = 0;
      var bodyEl = document.getElementsByTagName('BODY')[0];
      // watch open
      riot.app.on('dialog:opened', function() {
        openedDialogsCount++;
        bodyEl.classList.add('ui-dialog-opened');
      });
      // watch close
      riot.app.on('dialog:closed', function() {
        openedDialogsCount--;
        if (openedDialogsCount === 0) {
          bodyEl.classList.remove('ui-dialog-opened');
        }
      });
    }
  };

  return globals;
});
