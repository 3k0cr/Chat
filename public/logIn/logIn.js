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
        return res.text();
    })
    .then(msg => {
        switch(msg){
            case '0': {
                window.location.href = '/home';
                break;
            }
            case '1': {
                status.innerText = 'Incorrect username or password.';
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