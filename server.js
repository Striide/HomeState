//Lets require/import the HTTP module
var express = require('express');
var http = require('http')
var mongoose = require('mongoose');

var app = express()

mongoose.connect('mongodb://localhost/homestate');

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

//Lets start our server
app.listen(8081, function() {
  console.log('Example app listening on port 8081!');
})

// -------------- DB ----------------
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// -------------- SCHEMA -----------
var personSchema = mongoose.Schema({
  name: String
});
personSchema.methods.speak = function() {
  var greeting = this.name ? "Hi name is " + this.name : "I don't have a name";
  console.log(greeting);
}

var automatableSchema = mongoose.Schema({
  name: String,
  state: String
});
automatableSchema.methods.automate = function() {
  console.log(this.name + " is " + this.state);
}


var actionSchema = mongoose.Schema({
  name: String,
  action: String
});
actionSchema.methods.finish = function() {
  var log = this.name ? "Attention: " + this.name + "has performed the following action: " + this.action : "Hmm... not sure what just happened";
  console.log(greeting);
}

var Person = mongoose.model('Person', personSchema);
var Action = mongoose.model('Action', actionSchema);
var Automatable = mongoose.model('Automatable', automatableSchema);

// -------------- ROUTING ----------------

app.use('/static', express.static(__dirname + '/public'));

app.get("/person", function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  Person.find().lean().exec(function(err, people) {
    if (err) {
      return console.error(err);
    }
    console.log(JSON.stringify(people));
    res.write(JSON.stringify(people));
    res.end();
  });
});

app.put("/person", function(req, res) {
  var person = new Person({
    name: req.body.name
  });
  person.save(function(err) {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json'
      });
      res.end();
      return console.err(err);
    }
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify({
      'success': 1
    }));
    res.end();
    console.log(err);
  });
});

app.get("/action", function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  Action.find().lean().exec(function(err, actions) {
    if (err) {
      res.end();
      return console.error(err);
    }
    console.log(JSON.stringify(actions));
    res.write(JSON.stringify(actions));
    res.end();
  });
});


app.put("/action", function(req, res) {
  var action = new Action({
    name: req.body.name,
    action: req.body.action
  });
  action.save(function(err) {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json'
      });
      res.end();
      return console.err(err);
    }
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify({
      'success': 1
    }));
    res.end();
    console.log(err);
  });


});

app.put("/automatable", function(req, res) {
  var automatable = new Automatable({
    name: req.body.name,
    state: req.body.state
  });
  automatable.save(function(err) {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json'
      });
      res.end();
      return console.err(err);
    }
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify({
      'success': 1
    }));
    res.end();
    console.log(err);
  });


});

app.get("/automatable", function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  Automatable.find().lean().exec(function(err, automatable) {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json'
      });
      res.end();
      return console.error(err);
    }
    console.log(JSON.stringify(automatable));
    res.write(JSON.stringify(automatable));
    res.end();
  });

});