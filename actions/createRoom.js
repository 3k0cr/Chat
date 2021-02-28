const authId = require('../auth/authId.js');
const rooms = require('../data/rooms.js');
const users = require('../data/users.js');
const postBody = require('../request/postBody.js');

module.exports = function(req, res){
    if(req.method != 'POST') { res.writeHead(405); res.end(); return; }

    const session = authId(req);

    if(session){

        postBody(req)
            .then(data => {

                const roomName = JSON.parse(data).roomName;
                const owner = users.find(user => session.username == user.username);
                const roomExists = rooms.find(room => roomName == room.roomName);

                if(owner.rooms.length >= 3){
                    res.writeHead(409);
                    res.end('You can not own more than 3 rooms.');
                } else if(roomExists){
                    res.writeHead(409, { "Content-Type": "text/plain" });
                    res.end('Room name already exists.');
                } else {
                    rooms.push({ roomName, owner: session.username, usersIn: [] });
                    owner.rooms.push({ roomName });
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end('You have successfully registered the room ' + roomName + '.');
                }

            })
            .catch(err => {
                console.error(err);
            });

    } else {
        res.writeHead(401);
        res.end();
    }

}