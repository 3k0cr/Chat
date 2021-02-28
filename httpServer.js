const http = require('http');
const loadUResource = require('./resource/unprotected.js');
const loadPResource = require('./resource/protected.js');
const signUp = require('./auth/signUp.js');
const logIn = require('./auth/logIn.js');
const logOut = require('./auth/logOut.js');
const createRoom = require('./actions/createRoom.js');

const forbiddenRoutes = [
    
];

module.exports = http.createServer((req, res) => {

    if(req.url == '/') loadUResource(req, res, './public/index.html');
    else if(req.url == '/signUp' && req.method == 'GET') loadUResource(req, res, './public/signUp/signUp.html');
    else if(req.url == '/logIn' && req.method == 'GET') loadUResource(req, res, './public/logIn/logIn.html');
    else if(req.url == '/signUp' && req.method == 'POST') signUp(req, res);
    else if(req.url == '/logIn' && req.method == 'POST') logIn(req, res);
    else if(req.url == '/logOut') logOut(req, res);
    else if(req.url == '/home') loadPResource(req, res, 'home');
    else if(req.url == '/createRoom') createRoom(req, res);
    else if(req.url.split('?')[0] == '/room') loadPResource(req, res, 'room', undefined, req.url.split('?')[1]);
    else {
        const forbidden = forbiddenRoutes.find(route => route == req.url);
        if(!forbidden){

            if(req.url.split('.')[1] == 'js') loadUResource(req, res, './public' + req.url, 'application/javascript');
            else if(req.url.split('.')[1] == 'css') loadUResource(req, res, './public' + req.url, 'text/css');
            else loadUResource(req, res, './public' + req.url);

        } else {
            res.writeHead(403, { "Content-Type": "text/plain" });
            res.end('403. Forbidden.');
        }
    }
    
}).listen(process.env.PORT || 1234);

