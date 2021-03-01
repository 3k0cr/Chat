const clientList = require('../data/connClients.js');

module.exports = {
    broadcast(msg, sender, header){
        for(client of clientList){
            if(client.room == sender.room){
                client.sock.send(JSON.stringify([ header, msg ]));
            }
        }
    }
}