const uuid = require('uuid');
const sessions = require('../data/sessions.js');
const EXPIRES_IN = require('../config.json').SESSION_EXPIRE_IN;

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