//Lets require/import the HTTP module
var express = require('express');
var http = require('http')

var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

//Lets start our server
app.listen(8081, function() {
  console.log('Example app listening on port 8081!');
})

// -------------- ROUTING ----------------
app.use('/static', express.static(__dirname + '/public'));


var api_v1 = require('./api/v1/routes');
app.use('/api/v1', api_v1);