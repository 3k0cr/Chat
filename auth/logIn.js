const postBody = require('../request/postBody.js');
const users = require('../data/users.js');
const createSession = require('./createSession.js');

module.exports = function(req, res){
    postBody(req)
        .then(data => {
            const parsedData = JSON.parse(data);
            const found = users.find(user => user.username == parsedData.username &&
                 user.password == parsedData.password);
            
            if(found){

                const sesInfo = createSession(parsedData.username);
                res.writeHead(200, {
                    "Set-Cookie": `sesId=${sesInfo.sesId}; HttpOnly; SameSite=Strict`
                });
                res.end();

            } else {
                res.writeHead(409);
                res.end();
            }
        })
        .catch(err => {
            console.error(err);
            res.writeHead(500);
            res.end();
        });

}