var express = require('express');
var router = express.Router();

var controllers = require('./controllers');
var PersonController= new controllers.PersonController();
var ActionController= new controllers.ActionController();
var AutomatableController= new controllers.AutomatableController();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.route('/person')
  .get(PersonController.getAll)
  .put(PersonController.createOne);
  
router.route('/action')
  .get(ActionController.getAll)
  .put(ActionController.createOne);

router.route('/automatable')
  .put(AutomatableController.createOne)
  .get(AutomatableController.getAll);

module.exports = router;