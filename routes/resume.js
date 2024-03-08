const express = require('express');
const controller = require('../controller/resume');
const { auth } = require('../middleware/auth');

const router = express.Router();

// 이력서 등록.

router.post('/register', auth, controller.resumeRegister);

module.exports = router;
