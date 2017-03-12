var express = require('express');
var router = express.Router();
var spartaController = require('../controllers/sparta');
var usersController = require('../controllers/users');
var sessionsController = require('../controllers/sessions');


// Session Routes
router.route('/sessions')
      .post(sessionsController.create)
      .delete(sessionsController.delete);

router.route('/sessions/new')
      .get(sessionsController.new);

// User Routes
router.route('/users')
      .post(usersController.create);

router.route('/users/new')
      .get(usersController.new);

// Post Routes
router.route('/')
	.get(spartaController.index)
	.post(spartaController.create);

router.route('/new')
	.get(spartaController.new);

router.route('/:id')
	.get(spartaController.show)
	.put(spartaController.update)
	.delete(spartaController.delete);
	

module.exports = router;