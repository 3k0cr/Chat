const ws = new WebSocket('ws://localhost:1235');
const sesId = document.currentScript.getAttribute('sesId');
const roomName = document.currentScript.getAttribute('roomName').split('%20').join(' ');

const board = document.getElementById('board');
const message = document.getElementById('msg');
const sendBtn = document.getElementById('send-btn');
const usersIn = document.querySelector('#users-in ul');

console.log('%c Try not to refresh the browser until message history is implemented.', 
    'background-color: black; color: white');

ws.onopen = function(e){
    ws.send(JSON.stringify([ 'setup', sesId, roomName ]));
}

sendBtn.addEventListener('click', () => {
    ws.send(JSON.stringify([ 'message', message.value ]));
    message.value = '';
});

document.addEventListener('keydown', e => {
    if(e.code == 'Enter'){
        sendBtn.click();
    }
});

ws.onmessage = function(msg){
    const pMsg = JSON.parse(msg.data);
    switch(pMsg[0]){
        case "broadcast": {
            board.value += pMsg[1] + '\n';
            break;
        }
        case "userList": {
            usersIn.innerHTML = '';
            for(user of pMsg[1]){
                usersIn.innerHTML += `<li>${user}</li>`
            }
            break;
        }
    }
}