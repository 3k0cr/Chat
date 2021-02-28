module.exports = function(req){
    return new Promise((res, rej) => {
        
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('error', err => {
            rej(err);
        });

        req.on('end', () => {
            res(data);
        });

    });
}