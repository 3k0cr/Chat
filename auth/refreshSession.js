// Unused, for now.

const authId = require('./authId.js');
const createSession = require('./createSession.js');

module.exports = function(req, res){

    const session = authId(req);
    const sesInfo = createSession(session.username);
    if(session){
        res.writeHead(200, {
            "Set-Cookie": `sesId=${sesInfo.sesId}`
        });
        res.end();
    } else {
        res.writeHead(401);
    }

}