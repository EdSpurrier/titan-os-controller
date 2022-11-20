const udp = require('dgram');
const core = null;
const console = null;
const port = 0;

// creating a udp server
exports.server = udp.createSocket('udp4');


// emits when any error occurs
this.server.on('error', function (error) {
    this.console.logError('Error: ' + error);
    server.close();
});



exports.start = () => {
    this.server.bind(this.port);
    this.console.logAction("Server Binded to " + this.port);
}


exports.close = () => {
    //emits after the socket is closed using socket.close();
    this.server.on('close',function(){
        this.console.logAction('Socket is closed!');
    });
}

exports.setup = (titanCore, port) => {
    this.core = titanCore;
    this.console = titanCore.console;
    this.port = port;
    this.console.logProcessComplete(`UDP Server Setup`);

}



