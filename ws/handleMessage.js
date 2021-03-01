const sessions = require('../data/sessions.js');
const rooms = require('../data/rooms.js');
const clientList = require('../data/connClients.js');
const getUsersIn = require('./util.js').getUsersIn;
const findClient = require('./util.js').findClient;
const broadcast = require('./out.js').broadcast;

function handleSetup(clientSock, pMsg){
    const username = sessions.find(ses => ses.sesId == pMsg[1]).username;
    if(username){
        clientList.push({ username, sock: clientSock, inRoom: pMsg[2] });
        const clientFound = clientList[clientList.length - 1];
        broadcast(username + ' has joined the room.', clientFound, 'broadcast');
        broadcast(getUsersIn(pMsg[2]), clientFound, 'userList');
    }
}

function handleMessage(clientSock, pMsg){
    const clientFound = findClient(clientSock);
    if(clientFound){
        broadcast(clientFound.username + ': ' + pMsg[1], clientFound, 'broadcast');
    }
}

function handleClose(clientSock){
    const clientFound = findClient(clientSock);
    if(clientFound){
        broadcast(clientFound.username + ' has disconnected.', clientFound, 'broadcast');
        clientList.splice(clientList.indexOf(clientFound), 1);
        broadcast(getUsersIn(clientFound.inRoom), clientFound, 'userList');
    }
}

module.exports = {
    handleSetup,
    handleMessage,
    handleClose
}