var models = require('../../models');
var PersonProvider= new models.PersonProvider();
var ActionProvider= new models.ActionProvider();
var AutomatableProvider= new models.AutomatableProvider();

// =======================================================
var ActionController = function(){};

/**
 * @param {http.ClientRequest} req the request object
 * @param {http.ClientResponse} req the response object
 */
ActionController.prototype.getAll = function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  ActionProvider.findAll(function(err, actions) {
    if (err) {
      res.end();
      return console.error(err);
    }
    console.log(JSON.stringify(actions));
    res.write(JSON.stringify(actions));
    res.end();
  });
};

/**
 * @param {http.ClientRequest} req the request object
 * @param {http.ClientResponse} req the response object
 */
ActionController.prototype.createOne = function(req, res) {
  ActionProvider.create({
    name: req.body.name,
    action: req.body.action
  },function(err) {
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
};
exports.ActionController = ActionController;

// =======================================================
var PersonController = function(){};

/**
 * @param {http.ClientRequest} req the request object
 * @param {http.ClientResponse} req the response object
 */
PersonController.prototype.getAll = function(req, res) {
    res.writeHead(200, {
    'Content-Type': 'application/json'
  });

    PersonProvider.findAll(function(err, people) {
      if (err) {
        return console.error(err);
      }
      console.log(JSON.stringify(people));
      res.write(JSON.stringify(people));
      res.end();
    });
  };
  
/**
 * @param {http.ClientRequest} req the request object
 * @param {http.ClientResponse} req the response object
 */
PersonController.prototype.createOne = function(req, res) {
    PersonProvider.create({name: req.body.name },function(err) {
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
  };
exports.PersonController = PersonController;


// =======================================================
var AutomatableController = function(){};

/**
 * @param {http.ClientRequest} req the request object
 * @param {http.ClientResponse} req the response object
 */
AutomatableController.prototype.getAll = function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  AutomatableProvider.findAll(function(err, automatable) {
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
};

/**
 * @param {http.ClientRequest} req the request object
 * @param {http.ClientResponse} req the response object
 */
AutomatableController.prototype.createOne = function(req, res) {
  AutomatableProvider.create({
    name: req.body.name,
    state: req.body.state
  },function(err) {
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
};
exports.AutomatableController = AutomatableController;