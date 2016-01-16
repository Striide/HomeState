// -------------- DB ----------------
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/homestate');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


var Schema = mongoose.Schema;

// -------------- SCHEMA -----------
var personSchema = mongoose.Schema({
  name: String,
  versionKey: false 
});
personSchema.methods.speak = function() {
  var greeting = this.name ? "Hi name is " + this.name : "I don't have a name";
  console.log(greeting);
}

var automatableSchema = mongoose.Schema({
  name: String,
  state: String,
  versionKey: false 
});
automatableSchema.methods.automate = function() {
  console.log(this.name + " is " + this.state);
}


var actionSchema = mongoose.Schema({
  name: String,
  action: String,
  action_time: {type: Date, default: Date.now},
  versionKey: false 
});
actionSchema.methods.finish = function() {
  var log = this.name ? "Attention: " + this.name + "has performed the following action: " + this.action : "Hmm... not sure what just happened";
  console.log(greeting);
}

var Person = mongoose.model('Person', personSchema);
var Action = mongoose.model('Action', actionSchema);
var Automatable = mongoose.model('Automatable', automatableSchema);

// ===============================================================
PersonProvider = function(){};

PersonProvider.prototype.findAll = function(callback) {
  Person.find({}, function (err, people) {
    callback( err, people )
  }).lean().exec();  
};

PersonProvider.prototype.create = function(options,callback) {
  var person = new Person(options);
  person.save(callback);
};

exports.PersonProvider = PersonProvider;


// ===============================================================
ActionProvider = function(){};

ActionProvider.prototype.findAll = function(callback) {
  Action.find({}, function (err, actions) {
    callback( err, actions )
  }).lean().exec();  
};

ActionProvider.prototype.create = function(options,callback) {
  var action = new Action(options);
  action.save(callback);
};

exports.ActionProvider = ActionProvider;

// ===============================================================
AutomatableProvider = function(){};

AutomatableProvider.prototype.findAll = function(callback) {
  Automatable.find({}, function (err, automatables) {
    callback( err, automatables )
  }).lean().exec();  
};

AutomatableProvider.prototype.create = function(options,callback) {
  var automatable = new Automatable(options);
  automatable.save(callback);
};

exports.AutomatableProvider = AutomatableProvider;