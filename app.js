var ig = require('instagram-node').instagram(),
    fs = require('fs'),
    express = require('express'),
    app = express(),
    ejs = require('ejs');

// read instagram info
ig.use({ client_id: process.env.APP_ID,
         client_secret: process.env.APP_SECRET });

// EXPRESS CONFIG
app.engine('html', ejs.renderFile);
app.set('port', process.env.PORT || 8000);
app.use("/public",express.static(__dirname+"/public"));
app.use(express.static('node_modules'));

var server = app.listen(app.get('port'));
var io = require('socket.io').listen(server);

// Subscribe to hashtag
ig.add_tag_subscription('dubbelspenta', 'http://dubbelspenta.herokuapp.com/new_img', function(err, result, remaining, limit){
  console.log("Successfully subscribed to hashtag:", result);
});

app.get('/', function(req, res){
  res.render('index.html')
})

io.on('connection', function(socket){
  console.log('a user connected');
});

// Bind all types of requests to '/new_img'
app.all('/new_img', function(req, res){
  // Send image url to frontend via io
  io.emit('image', req.data);
});
