const fs = require('fs');

function loadFile(fPath){
    return new Promise((res, rej) => {
        fs.readFile(fPath, 'utf-8', (err, data) => {
            if(err) rej(err);
            res(data);
        });
    });
}

function loadBinary(fPath){
    return new Promise((res, rej) => {
        fs.readFile(fPath, (err, data) => {
            if(err) rej(err);
            res(data);
        });
    });
}

function getFilesFromDir(dir){
    return new Promise((res, rej) => {
        fs.readdir(dir, 'utf-8', (err, files) => {
            if(err) rej(err);
            res(files);
        });
    });
}

module.exports = {
    loadBinary,
    loadFile,
    getFilesFromDir
}