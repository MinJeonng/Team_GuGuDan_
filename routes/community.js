const express = require('express');
const controller = require('../controller/community');
const { auth } = require('../middleware/auth');
const { route } = require('./page');

const router = express.Router();

//GET /all 전체글 조회 그대로 가져오기.
router.get('/all', controller.boardAll);
// //검색하기
// router.get('/search', controller.searchEmploy);
// //GET /post/:id 게시판글 하나 조회
router.get('/:id', controller.boardDetail);
// //POST /write 게시판 글 하나 생성
router.post('/write', auth, controller.communityWrite);
// //PATCH /update 게시판 글 하나 수정
// router.patch('/:id/update', auth, controller.boardUpdate);
// //DELETE /delete 게시판 글 하나 삭제
// router.delete('/:id/delete', auth, controller.boardDelete);

module.exports = router;
