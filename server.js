var express = require('express');
var app = express();
var path = require('path');
var csv = require('csv-parser');
var fs = require('fs');

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.use('/vendor', express.static('client/vendor'));
app.use(express.static('client'));

app.get('/getData', function(req, res) {
	var result = {};

	fs.createReadStream('fgpct.csv')
	.pipe(csv())
  	.on('data', function (data) {
  		console.log(JSON.stringify(data));
    	result[data.x] = data;
  	})
  	.on('end', function(){
  		res.send(result);
  	});
});

app.get('/getSpeedData', function(req, res) {
	var result = {};

	fs.createReadStream('JamalCraw.csv')
	.pipe(csv())
  	.on('data', function (data) {
  		console.log(JSON.stringify(data));
    	result[data.x] = data;
  	})
  	.on('end', function(){
  		res.send(result);
  	});
});

var server = app.listen('3000', function() {
   var port = server.address().port;
   
   console.log("Example app listening at http://localhost:%s", port);
});