const username = document.currentScript.getAttribute('username');
const ownedRooms = JSON.parse(document.currentScript.getAttribute('ownedRooms'));
const status = document.getElementById('status');
const ownedRoomsList = document.querySelector('#rooms ul');

for(room of ownedRooms){
    ownedRoomsList.innerHTML += `<li>${room.roomName}</li>`
}

document.getElementById('join-room').addEventListener('click', () => {

    const roomName = document.getElementById('room-name').value;
    window.location.href = `/room?name=${roomName}`;

});

document.getElementById('create-room').addEventListener('click', () => {

    const roomName = document.getElementById('room-name').value;
    fetch('/createRoom', {
        method: 'POST',
        body: JSON.stringify({
            roomName
        })
    })
    .then(res => {
        return res.text();
    })
    .then(msg => {
        switch(msg){
            case '0': {
                status.innerText = 'You can not own more than 3 rooms';
                break;
            }
            case '1': {
                status.innerText = 'Chosen room already exists.';
                break;
            }
            case '2': {
                window.location.href = '/home';
                break;
            }
            default: {
                throw Error(msg);
            }
        }
    })
    .catch(err => {
        console.error(err);
    });

});