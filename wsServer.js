const ws = require('ws');
const handleSock = require('./ws/handleSock.js');
const config = require('./config.json');

module.exports = function(){

    const wsServer = new ws.Server({ port: process.env.PORT || config.WS_PREFERRED_PORT });
    wsServer.on('connection', clientSock => {
        handleSock(clientSock);
    });

}();