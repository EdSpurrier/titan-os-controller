const ioHook = require('iohook');
exports.console = null;
exports.debug = false;
let ids = new Array();





//  shorcutArray => shortcut key combination e.g. [3675, 61003] <=> [Windows-Key + Left]
//  callback => action
exports.setShortcut = (shortcutArray, callback, callbackParam) => {
    ids.push(ioHook.registerShortcut(shortcutArray, (keys) => {

        let keyNames = "[";

        keys.forEach(key => {
            keyNames += String.fromCharCode(key) + ",";
        });
        keyNames += "]";

        this.console.log('Shortcut called with keys:', keys, keyNames);

        callback(callbackParam);

      }));
}

exports.init = (console, debug=false) => {
    this.debug = debug;
    this.console = console;

    if(debug) {
        ioHook.on('keydown', (event) => {
            console.log(event); //Keydown
        });
    }


    
    // Register and start hook
    ioHook.start();
    
    // Alternatively, pass true to start in DEBUG mode.
    ioHook.start(true);
    
    // False to disable DEBUG. Cleaner terminal output.
    ioHook.start(false);
    
    console.logProcessComplete("OS Shortcuts Initialized.");
}


