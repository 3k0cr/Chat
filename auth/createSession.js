const uuid = require('uuid');
const sessions = require('../data/sessions.js');

/*
    12 hour sessions.
    Trying to find a good balance between security and user annoyance.
*/
const EXPIRES_IN = 720;

module.exports = function(username){
    const sesId = uuid.v4();
    const session = {
        sesId,
        username
    }

    sessions.push(session);
    setTimeout(() => {
        const index = sessions.findIndex(session => sesId == session.sesId);
        if(index != -1){
            console.log('Deleted ' + sessions[index].username + "'s" + ' session.');
            sessions.splice(index, 1);
        }
    }, EXPIRES_IN * 60000);

    return { sesId, EXPIRES_IN };
}