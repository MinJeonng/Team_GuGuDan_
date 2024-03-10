const express = require('express');
const controller = require('../controller/page');

const router = express.Router();

router.get('/', controller.main); //메인페이지, main homepage
router.get('/intro', controller.intro);
router.get('/user', controller.member);
router.get('/user/login', controller.login);
router.get('/user/signup', controller.signup);
router.get('/user/info', controller.info); //사용자 정보 조회
router.get('/user/findIdPw', controller.findIdPw);

router.get('/employ/board', controller.board_main); //채용공고 게시판 페이지
router.get('/employ/board/:id', controller.board_detail); //상세 페이지
router.get('/employ/write', controller.board_write); //글쓰기 페이지
//이력서
router.get('/resume/mypage', controller.mypage); // 마이페이지
router.get('/resume/register', controller.resume_register); // 이력서 등록
router.get('/resume/register/:id', controller.resume_detail);
//벼룩시장
router.get('/market/board', controller.market_main); //벼룩시장 게시판전체.
router.get('/market/board/:id', controller.market_detail); //버룩시장 상세페이지(detail)
router.get('/market/write', controller.market_write); //벼룩시장 글쓰기
//채팅
// router.get('/market/chat', controller.chat); // 채팅.

//커뮤니티
router.get('/community/board', controller.community_main); //커뮤니티 게시판전체
router.get('/community/board/:id', controller.community_detail); //커뮤니티 상세페이지
router.get('/community/write', controller.community_write); //커뮤니티 글쓰기

module.exports = router;
