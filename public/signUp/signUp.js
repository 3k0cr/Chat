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
        if(res.status == 200) status.innerText = 'Successfully signed up.';
        else if(res.status == 409) status.innerText = 'Someone with this username already exists.';
        if(!res.ok){
            throw Error(res.statusText);
        }
    })
    .catch(err => {
        console.error(err);
    });

});