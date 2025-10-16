const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// login
router.post('/login', usersController.login);

module.exports = router;
