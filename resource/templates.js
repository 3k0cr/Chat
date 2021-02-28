const qs = require('querystring');
const rooms = require('../data/rooms.js');
const users = require('../data/users.js');

function home(session){

    const user = users.find(u => session.username == u.username);

    return `

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
        <script src="./home/logOut.js" defer></script>
        
        <script src="./home/script.js" 
        username="${session.username}" 
        ownedRooms=${JSON.stringify(user.rooms).split(' ').join('%20')} 
        defer></script>

        <link rel="stylesheet" href="./home/styles.css">
    </head>
    <body>
        <button id="log-out">Log Out</button>
        <h1>Hello ${session.username}.</h1>
        <input type="text" id="room-name" placeholder="Room Name">
        <br>
        <button id="join-room">Join Room</button>
        <button id="create-room">Create Room</button>
        <br>
        <span id="status"></span>
        <br>
        <div id="rooms">
            <h4>Your Rooms</h4>
            <ul>
            </ul>
        </div>
    </body>
    </html>

    `;
}

function room(session, query){
    const roomName = qs.parse(query).name;
    const roomFound = rooms.find(room => roomName == room.roomName);
    
    if(roomFound){

    return `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="./room/script.js" sesId=${session.sesId} roomName=${roomName.split(' ').join('%20')} defer></script>
        <link rel="stylesheet" href="./room/styles.css">
        <title>Room ${roomName}</title>
    </head>
    <body>
        <h1>Room ${roomName}</h1>
        <h4>Owner: ${roomFound.owner}</h4>
        <textarea id="board" rows=10 cols=30 readonly></textarea>
        <br>
        <input type="text" id="msg">
        <button id="send-btn">Send</button>
        <div id="users-in">
            <h4>Users In</h4>
            <ul>
            </ul>
        </div>
    </body>
    </html>

    `;

    } else {

    return `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Does Not Exist</title>
    </head>
    <body>
        <span>Room ${roomName} does not exist.</span>
    </body>
    </html>
    
    `
    }
}

module.exports = function(page, session, query){
    if(page == 'home') return home(session);
    if(page == 'room') return room(session, query);
}