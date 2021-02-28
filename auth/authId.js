const ncookie = require('node-cookie');
const sessions = require('../data/sessions.js');

module.exports = function(req){

    const cookies = ncookie.parse(req);
    const found = sessions.find(ses => cookies.sesId == ses.sesId);

    return found;
    
}