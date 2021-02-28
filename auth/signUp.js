const postBody = require('../request/postBody.js');
const users = require('../data/users.js');

module.exports = function(req, res){
    postBody(req)
        .then(data => {
            const parsedData = JSON.parse(data);
            const sameUsername = users.find(user => user.username == parsedData.username);
            if(sameUsername){
                res.writeHead(409);
                res.end();
            } else {
                users.push({
                    username: parsedData.username,
                    password: parsedData.password,
                    rooms: [
                        
                    ]
                });
                res.writeHead(200);
                res.end();
            }
        })
        .catch(err => {
            console.error(err);
            res.writeHead(500);
            res.end();
        });
}