var ig = require('instagram-node').instagram(),
    fs = require('fs'),
    express = require('express'),
    app = express(),
    io = require('socket.io')(http);

// read instagram info
var instaConf = JSON.parse(fs.readFileSync('instagram.json', 'UTF-8'));
ig.use({ client_id: instaConf.APP_ID,
         client_secret: instaConf.APP_SECRET });
