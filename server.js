var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.use('/vendor', express.static('client/vendor'));
app.use(express.static('client'));

var server = app.listen('3000', function() {
   var port = server.address().port;
   
   console.log("Example app listening at http://localhost:%s", port);
});