const express = require('express');
const controller = require('../controller/employ_board');
const { auth } = require('../middleware/auth');
const { route } = require('./page');

const router = express.Router();

//GET /all 전체글 조회
router.get('/all', controller.boardAll);
//검색하기
router.get('/search', controller.searchEmploy);
// router.get('/mainSearch', controller.searchMainEmploy);
//GET /post/:id 게시판글 하나 조회
router.get('/:id', controller.boardDetail); //board/1 이렇게 쓰임
//POST /write 게시판 글 하나 생성
router.post('/write', controller.boardWrite); // auth 써줘야함!!!!
//PATCH /update 게시판 글 하나 수정
router.patch('/:id/update', auth, controller.boardUpdate);
//DELETE /delete 게시판 글 하나 삭제
router.delete('/:id/delete', auth, controller.boardDelete);

module.exports = router;
