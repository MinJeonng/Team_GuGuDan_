const express = require('express');
const controller = require('../controller/resume');
const { auth } = require('../middleware/auth');

const router = express.Router();

// 이력서 등록.

router.post('/register', auth, controller.resumeRegister);
router.get('/userInfo', auth, controller.userInfo);
router.get('/all', auth, controller.boardAll);
router.get('/:id', controller.boardDetail);
module.exports = router;
