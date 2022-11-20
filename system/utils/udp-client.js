var udp = require('dgram');

exports.client = udp.createSocket('udp4');
const core = null;
const console = null;




exports.send = (msg, port, ip = 'localhost', errorMsg = "Send Failed") => {
    var data = Buffer.from(msg);

    this.client.send(
        data,
        port, 
        ip,
        function(error){
        if(error){
            client.close();
            this.console.log("Send Error", errorMsg);
        }else{
            this.console.log(msg,' => Sent.');
        }
    });

}



exports.setup = (titanCore) => {
    this.core = titanCore;
    this.console = titanCore.console;

    this.console.logProcessComplete(`UDP Client Setup`);
};
