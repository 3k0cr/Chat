const fUtil = require('../fileUtil.js');

module.exports = function(req, res, pagePath, type = 'text/html'){

    if(req.method != 'GET') { res.writeHead(405); res.end(); return; }

    fUtil.loadFile(pagePath)
        .then(file => {
            res.writeHead(200, { "Content-Type": type });
            res.end(file);
        })
        .catch(err => {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end('404. Resource not found.');
        });

}