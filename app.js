var ig = require('instagram-node').instagram(),
    fs = require('fs'),
    express = require('express'),
    app = express(),
    io = require('socket.io')(http);

// read instagram info
var instaConf = JSON.parse(fs.readFileSync('instagram.json', 'UTF-8'));
ig.use({ client_id: instaConf.APP_ID,
         client_secret: instaConf.APP_SECRET });

// EXPRESS CONFIG
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8000);
app.use("/scripts",express.static(__dirname+"/scripts"));

var server = app.listen(app.get('port'), function() {
  console.log("Listening on port %d", server.address().port);
});

// Subscribe to hashtag
ig.add_tag_subscription('dubbelspenta', 'http://213.114.76.130/new_img', function(err, result, remaining, limit){
  console.log("Successfully subscribed to hashtag");
});

// Bind all types of requests to '/new_img'
app.all('/new_img', function(req, res){
  // Send image url to frontend via io
});
