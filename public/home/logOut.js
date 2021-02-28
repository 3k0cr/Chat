document.getElementById('log-out').addEventListener('click', () => {
    fetch('/logOut', {
        method: 'DELETE'
    })
    .then(res => {
        if(res.status == 200) window.location.href = '/logIn';
        else throw Error(res.statusText);
    })
    .catch(err => {
        console.error(err);
    });

});