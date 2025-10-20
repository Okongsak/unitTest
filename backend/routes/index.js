const express = require('express');
const router = express.Router(); // ใช้ Router ของ Express สร้าง API แยกส่วน
const usersController = require('../controllers/usersController');

// login
router.post('/login', usersController.login);

module.exports = router;
