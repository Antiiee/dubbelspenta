var ig = require('instagram-node').instagram(),
    fs = require('fs'),
    express = require('express'),
    app = express(),
    ejs = require('ejs'),
    http = require('http'),
    io = require('socket.io')(http);

// read instagram info
ig.use({ client_id: process.env.APP_ID,
         client_secret: process.env.APP_SECRET });

// EXPRESS CONFIG
app.engine('html', ejs.renderFile);
app.set('port', process.env.PORT || 8000);
app.use("/public",express.static(__dirname+"/public"));
app.use(express.static('node_modules'));

// Subscribe to hashtag
ig.add_tag_subscription('dubbelspenta', 'http://dubbelspenta.herokuapp.com/new_img', function(err, result, remaining, limit){
  console.log("Successfully subscribed to hashtag");
});

app.get('/', function(req, res){
  res.render('index.html')
})

// Bind all types of requests to '/new_img'
app.all('/new_img', function(req, res){
  // Send image url to frontend via io
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
