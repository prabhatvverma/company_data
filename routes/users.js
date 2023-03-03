const { Router, response } = require('express');
var express = require('express');
var router = express.Router();
var user = require('../model/user')

const UsersController = require("../controllers/UsersController");

router.get('/', UsersController.index);

router.get('/create', UsersController.create);

router.post('/store', UsersController.store);

router.get('/login', UsersController.login);

router.get('/:id/edit', UsersController.edit);

router.get('/:id/delete', UsersController.delete);

router.post('/update/:id',UsersController.update);

module.exports = router;
