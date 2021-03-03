document.getElementById('log-out').addEventListener('click', () => {
    fetch('/logOut', {
        method: 'DELETE'
    })
    .then(res => {
        return res.text();
    })
    .then(msg => {
        switch(msg){
            case '0': {
                window.location.href = './logIn';
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