'use strict';

const { TitanCore } = require('titan-core');
const { GetWindow, SetDisplayData, Snap } = require('./utils/window-controller');
const ioHook = require('iohook');

// MODULES
const udpServer = require('./utils/udp-server')
const udpClient = require('./utils/udp-client')


var titanCore = new TitanCore();
var console = titanCore.console;



//  UDP SERVER
udpServer.setup(titanCore, 4004);

udpServer.server.on('message', function(msg,info){
  console.log('=====================');
  if ( msg.toString().includes('display-data') )  {
      console.log("Display Data Received!!");
      let displayData = JSON.parse(msg.toString())[0];
      SetDisplayData(displayData['display-data']); 

      if(displayData['action']['action'] == 'snap') {
        Snap(displayData['action']);
      }

  } else {
      console.log('Data received from client : ' + msg.toString());
      console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
      console.log('---------------------');
  }
  console.log('=====================');
});

udpServer.start();





//  UDP CLIENT
udpClient.setup(titanCore);

ioHook.on('keydown', (event) => {
  console.log(event); //Keydown
});

let ids = new Array();

/* const id = ioHook.registerShortcut([29, 65], (keys) => {
    console.log('Shortcut called with keys:', keys);
    let action = { 
      action: 'snap',
      parameters: ['left']
    };

    udpClient.send( 
      JSON.stringify({
        'command' : 'get-displays',
        'action'  : action,
      }), 4003);
}); */


ids.push(ioHook.registerShortcut([3675, 61003], (keys) => {
  console.log('Shortcut called with keys:', keys);
  let action = { 
    action: 'snap',
    parameters: ['left']
  };

  udpClient.send( 
    JSON.stringify({
      'command' : 'get-displays',
      'action'  : action,
    }), 4003);
}));


ids.push(ioHook.registerShortcut([3675, 61005], (keys) => {
  console.log('Shortcut called with keys:', keys);
  let action = { 
    action: 'snap',
    parameters: ['right']
  };

  udpClient.send( 
    JSON.stringify({
      'command' : 'get-displays',
      'action'  : action,
    }), 4003);
}));



ids.push(ioHook.registerShortcut([3675, 61001], (keys) => {
  console.log('Shortcut called with keys:', keys);
  let action = { 
    action: 'snap',
    parameters: ['up']
  };

  udpClient.send( 
    JSON.stringify({
      'command' : 'get-displays',
      'action'  : action,
    }), 4003);
}));



ids.push(ioHook.registerShortcut([3675, 61009], (keys) => {
  console.log('Shortcut called with keys:', keys);
  let action = { 
    action: 'snap',
    parameters: ['down']
  };

  udpClient.send( 
    JSON.stringify({
      'command' : 'get-displays',
      'action'  : action,
    }), 4003);
}));


// 2
ids.push(ioHook.registerShortcut([3675, 57424], (keys) => {
  console.log('Shortcut called with keys:', keys);
  let action = { 
    action: 'snap',
    parameters: ['2']
  };

  udpClient.send( 
    JSON.stringify({
      'command' : 'get-displays',
      'action'  : action,
    }), 4003);
}));

ids.push(ioHook.registerShortcut([3675, 80], (keys) => {
  console.log('Shortcut called with keys:', keys);
  let action = { 
    action: 'snap',
    parameters: ['2']
  };

  udpClient.send( 
    JSON.stringify({
      'command' : 'get-displays',
      'action'  : action,
    }), 4003);
}));


//3
ids.push(ioHook.registerShortcut([3675, 81], (keys) => {
  console.log('Shortcut called with keys:', keys);
  let action = { 
    action: 'snap',
    parameters: ['3']
  };

  udpClient.send( 
    JSON.stringify({
      'command' : 'get-displays',
      'action'  : action,
    }), 4003);
}));

ids.push(ioHook.registerShortcut([3675, 3665], (keys) => {
  console.log('Shortcut called with keys:', keys);
  let action = { 
    action: 'snap',
    parameters: ['3']
  };

  udpClient.send( 
    JSON.stringify({
      'command' : 'get-displays',
      'action'  : action,
    }), 4003);
}));

//4
ids.push(ioHook.registerShortcut([3675, 75], (keys) => {
  console.log('Shortcut called with keys:', keys);
  let action = { 
    action: 'snap',
    parameters: ['4']
  };

  udpClient.send( 
    JSON.stringify({
      'command' : 'get-displays',
      'action'  : action,
    }), 4003);
}));

ids.push(ioHook.registerShortcut([3675, 57419], (keys) => {
  console.log('Shortcut called with keys:', keys);
  let action = { 
    action: 'snap',
    parameters: ['4']
  };

  udpClient.send( 
    JSON.stringify({
      'command' : 'get-displays',
      'action'  : action,
    }), 4003);
}));

// Register and start hook
ioHook.start();

// Alternatively, pass true to start in DEBUG mode.
ioHook.start(true);

// False to disable DEBUG. Cleaner terminal output.
ioHook.start(false);




console.logProcessComplete("System Started...");