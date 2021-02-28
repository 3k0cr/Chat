// TODO: Clean this up.

const ws = require('ws');
const sessions = require('./data/sessions.js');
const rooms = require('./data/rooms.js');

const clientList = [];

module.exports = function(){
    
    const wsServer = new ws.Server({ port: 1235 });

    wsServer.on('connection', clientSock => {
        
        clientSock.on('message', msg => {
            const pMsg = JSON.parse(msg);
            switch(pMsg[0]){

                case 'setup': {
                    const username = sessions.find(ses => ses.sesId == pMsg[1]).username;
                    const room = rooms.find(room => pMsg[2] == room.roomName);
                    if(username && room){
                        clientList.push({ username, sock: clientSock, inRoom: pMsg[2] });
                        room.usersIn.push(username);
                        const clientFound = clientList[clientList.length - 1];
                        broadcast(username + ' has joined the room.', clientFound);
                        sendUserList(room.usersIn, clientFound);
                    }
                    break;
                }

                case 'message': {
                    const clientFound = findClient(clientSock);
                    if(clientFound){
                        broadcast(clientFound.username + ': ' + pMsg[1], clientFound);
                    }
                    break;
                }

            }
        });

        clientSock.on('close', () => {
            const clientFound = findClient(clientSock);
            if(clientFound){
                broadcast(clientFound.username + ' has disconnected.', clientFound);
                const newUsersIn = removeFromUsersIn(clientFound);
                clientList.splice(clientList.indexOf(clientFound), 1);
                sendUserList(newUsersIn, clientFound);
            }
        });

    });

}();

function broadcast(msg, sender){
    for(client of clientList){
        if(client.room == sender.room){
            client.sock.send(JSON.stringify([ 'broadcast', msg ]));
        }
    }
}

function sendUserList(list, sender){
    for(client of clientList){
        if(client.room == sender.room){
            client.sock.send(JSON.stringify([ 'userList', list ]));
        }
    }
}

function removeFromUsersIn(client){
    const room = rooms.find(room => room.roomName == client.inRoom);
    const userToRemove = room.usersIn.findIndex(userIn => userIn == client.username);
    room.usersIn.splice(userToRemove, 1);
    
    return room.usersIn;
}

function findClient(clientSock){
    const found = clientList.find(client => client.sock == clientSock);
    return found;
}