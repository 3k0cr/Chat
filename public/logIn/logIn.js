const status = document.getElementById('status');

document.getElementById('log-in').addEventListener('click', () => {

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    fetch('/logIn', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })
    .then(res => {
        if(res.status == 200) window.location.href = '/home';
        else if(res.status == 409) status.innerText = 'Incorrect username or password.';
        if(!res.ok){
            throw Error(res.statusText);
        }
    })
    .catch(err => {
        console.error(err);
    });

});