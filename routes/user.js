const express = require('express');
const controller = require('../controller/user');
const middleware = require('../middleware/auth'); // 사용자 인증정보 미들웨어

const router = express.Router();

//POST /signup 회원가입.
router.post('/signup', controller.signup);
//POST /login 로그인
router.post('/login', controller.login);

// 아이디 찾기
router.post('/find-id', controller.findID);
//비밀번호 찾기에서 아이디 존재여부 확인
router.post('/find-pw', controller.sendEmail);

//유저 프로필 조회
router.post('/info', middleware.auth, controller.findUser);

//유저 프로필 수정
router.patch('/update', middleware.auth, controller.updateUser); // /info/update

//유저 비밀번호 수정
//router.patch('/update/pw', middleware.auth, controller.updatePw);

//유저 탈퇴
router.delete('/delete', middleware.auth, controller.deleteUser);

//회원가입 시 이메일 전송
router.post('/email', controller.emailAuth);
//비밀번호 찾기 시 이메일 전송
router.post('/email_pw', controller.emailAuth_pw);

//닉네임 중복확인
router.post('/check-nick', controller.checkDuplicateNick);
//아이디 중복확인
router.post('/check-id', controller.checkDuplicateId);

module.exports = router;
