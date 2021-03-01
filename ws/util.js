const clientList = require('../data/connClients.js');

module.exports = {
    getUsersIn(room){
        const clientsIn = clientList.filter(client => client.inRoom == room);
        const usernamesIn = [];
        for(client of clientsIn){
            usernamesIn.push(client.username);
        }
        return usernamesIn;
    },
    
    findClient(clientSock){
        const found = clientList.find(client => client.sock == clientSock);
        return found;
    }
}