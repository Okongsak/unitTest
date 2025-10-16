const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// register
router.post('/register', usersController.createUser);

module.exports = router;
