const status = document.getElementById('status');

document.getElementById('sign-up').addEventListener('click', () => {

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    fetch('/signUp', {
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
                status.innerText = 'Someone with this username already exists.';
                break;
            }
            case '1': {
                status.innerText = 'Successfully signed up.';
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