const handleMsg = require('./handleMessage.js');

module.exports = function(clientSock){

    clientSock.on('message', msg => {
        const pMsg = JSON.parse(msg);
        switch(pMsg[0]){

            case 'setup': {
                handleMsg.handleSetup(clientSock, pMsg);
                break;
            }

            case 'message': {
                handleMsg.handleMessage(clientSock, pMsg);
                break;
            }

        }
    });

    clientSock.on('close', () => {
        handleMsg.handleClose(clientSock);
    });

}