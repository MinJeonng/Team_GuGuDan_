const express = require('express');
const controller = require('../controller/user');
const middleware = require('../middleware/auth'); // 사용자 인증정보 미들웨어

const router = express.Router();

//POST /signup 회원가입.
router.post('/signup', controller.signup);
//POST /login 로그인
router.post('/login', controller.login);

// 비밀번호 아이디 찾기
router.post('/findIDPW', controller.findIDPW);

//유저 프로필 조회
router.post('/info', middleware.auth, controller.findUser);

//유저 프로필 수정
router.patch('/update', middleware.auth, controller.updateUser); // /info/update

//유저 비밀번호 수정
//router.patch('/update/pw', middleware.auth, controller.updatePw);

//유저 탈퇴
router.delete('/delete', middleware.auth, controller.deleteUser);

//이메일 전송
router.post('/email', controller.emailAuth);

//닉네임 중복확인
router.post('/check-nick', controller.checkDuplicateNick);
//아이디 중복확인
router.post('/check-id', controller.checkDuplicateId);

module.exports = router;
