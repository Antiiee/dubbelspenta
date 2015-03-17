var Instagram = require('instagram-node-lib'),
    fs = require('fs'),
    port = process.env.PORT || 8000,
    express = require('express'),
    app = express(),
    io = require('socket.io').listen(app.listen(port)),
    ejs = require('ejs'),
    _ = require('lodash');

// EXPRESS CONFIG
app.engine('html', ejs.renderFile);
app.set('port', process.env.PORT || 8000);
app.use("/public",express.static(__dirname+"/public"));
app.use(express.static('node_modules'));
app.use (function(req, res, next) {
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
       data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
});

// Initialize io for heroku
io.set("transports", ["xhr-polling"]);
io.set("polling duration", 10);

// read instagram info
Instagram.set('client_id', process.env.APP_ID);
Instagram.set('client_secret', process.env.APP_SECRET);
Instagram.set('callback_url', 'http://dubbelspenta.herokuapp.com/callback');
Instagram.set('redirect_uri', 'http://dubbelspenta.herokuapp.com');

// Subscribe to hashtag
Instagram.subscriptions.subscribe({
  object: 'tag',
  object_id: 'dubbelspenta',
  aspect: 'media',
  callback_url: 'http://dubbelspenta.herokuapp.com/callback',
  type: 'subscription',
  id: '#'
});

// Root url
app.get('/', function(req, res){
  res.render('index.html')
})

// Handle the initial connection
// Send the latest images to client
io.on('connection', function(socket){
  console.log('a user connected');
  Instagram.tags.recent({
      name: 'dubbelspenta',
      complete: function(data) {
        data = _.map(data, function(i){ return i.images.standard_resolution.url; });
        socket.emit('firstImage', { images: data });
      }
  });
});

// catch that url callback
app.get('/callback', function(req, res){
    var handshake =  Instagram.subscriptions.handshake(req, res);
});

// Bind all types of requests to '/new_img'
app.post('/callback', function(req, res){
  // Send image url to frontend via io
  var data = JSON.parse(req.body);

  data.forEach(function(img){
    var url = 'https://api.instagram.com/v1/tags/' + img.object_id + '/media/recent?client_id='+process.env.APP_ID;
    io.emit('image', url);
  });

  res.end();
});

console.log('Server listening on ', port);
