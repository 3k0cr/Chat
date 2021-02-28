const createPage = require('../resource/templates.js');
const users = require('../data/users.js');
const authId = require('../auth/authId.js');

module.exports = function(req, res, page, type = 'text/html', query = ''){

    if(req.method != 'GET') { res.writeHead(405); res.end(); return; }
    
    const session = authId(req);

    if(session){
        // const user = users.find(user => user.username == session.username);
        res.writeHead(200, { "Content-Type": type });
        res.end(createPage(page, session, query));
    } else {
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end('You are not authorized to view this page.');
    }

}