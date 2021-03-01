const ws = require('ws');
const handleSock = require('./ws/handleSock.js');

module.exports = function(){

    const wsServer = new ws.Server({ port: 1235 });
    wsServer.on('connection', clientSock => {
        handleSock(clientSock);
    });

}();