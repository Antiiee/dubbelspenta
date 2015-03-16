var Instagram = require('instagram-node-lib'),
    fs = require('fs'),
    express = require('express'),
    app = express(),
    ejs = require('ejs');

// read instagram info
Instagram.set('client_id', process.env.APP_ID);
Instagram.set('client_secret', process.env.APP_SECRET);
Instagram.set('callback_url', 'http://dubbelspenta.herokuapp.com/callback');
Instagram.set('redirect_uri', 'http://dubbelspenta.herokuapp.com');

// EXPRESS CONFIG
app.engine('html', ejs.renderFile);
app.set('port', process.env.PORT || 8000);
app.use("/public",express.static(__dirname+"/public"));
app.use(express.static('node_modules'));

var server = app.listen(app.get('port'));
var io = require('socket.io').listen(server);

// Subscribe to hashtag
Instagram.subscriptions.subscribe({
  object: 'tag',
  object_id: 'dubbelspenta',
  aspect: 'media',
  callback_url: 'http://dubbelspenta.herokuapp.com/new_img',
  type: 'subscription',
  id: '#'
});

app.get('/', function(req, res){
  res.render('index.html')
})

io.on('connection', function(socket){
  console.log('a user connected');
  Instagram.tags.recent({
      name: 'dubbelspenta',
      complete: function(data) {
        var url = 'https://api.instagram.com/v1/tags/' + data[0].id + '/media/recent?client_id='+process.env.APP_ID
        socket.emit('image', url);
      }
  });
});

app.get('/callback', function(req, res){
    var handshake =  Instagram.subscriptions.handshake(req, res);
});

// Bind all types of requests to '/new_img'
app.all('/new_img', function(req, res){
  // Send image url to frontend via io
  var data = req.body;

  var url = 'https://api.instagram.com/v1/tags/' + data[0].object_id + '/media/recent?client_id='+process.env.APP_ID
  io.emit('image', url);
});
