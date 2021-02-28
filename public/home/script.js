const username = document.currentScript.getAttribute('username');
const ownedRooms = JSON.parse(document.currentScript.getAttribute('ownedRooms').split('%20').join(' '));
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
        if(res.status == 200) return res.text();
        else if(res.status == 409) return res.text();
        if(!res.ok){
            throw Error(res.statusText);
        }
    })
    .then(msg => {
        status.innerText = msg;
    })
    .catch(err => {
        console.error(err);
    });

});