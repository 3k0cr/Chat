const authId = require('./authId.js');
const sessions = require('../data/sessions.js');

module.exports = function(req, res){
    if(req.method != 'DELETE') { res.writeHead(405); res.end(); return; }

    const session = authId(req);
    if(session){
        const index = sessions.findIndex(ses => session.sesId == ses.sesId);
        if(index != -1){
            sessions.splice(index, 1)
            res.writeHead(200, {
                "Set-Cookie": "sesId=",
                "Content-Type": "text/plain"
            });
            res.end('0');
        } else {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end('Internal server error.');
        }
        
    } else {
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end('You are not authorized to complete this request.');
    }
}