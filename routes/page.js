const express = require('express');
const controller = require('../controller/page');

const router = express.Router();

router.get('/', controller.main); //메인페이지
router.get('/intro', controller.intro);
router.get('/user', controller.member);
router.get('/user/login', controller.login);
router.get('/user/signup', controller.signup);
router.get('/user/info', controller.info); //사용자 정보 조회
// router.get('/member/pwFind',controller.pwFind)
// router.get('/member/idFind',controller.idFind)
router.get('/employ/board', controller.board_main); //채용공고 게시판 페이지
router.get('/employ/board/:id', controller.board_detail); //상세 페이지
router.get('/employ/write', controller.board_write); //글쓰기 페이지
//이력서
router.get('/resume/register', controller.resume_register); // 이력서 등록

module.exports = router;
