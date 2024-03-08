const { Community } = require('../models');

//게시글 전체 조회  => 경로 ?
exports.boardAll = async (req, res) => {
    try {
        const result = await Community.findAll({ order: [['id', 'desc']] });
        console.log('all', result);
        res.json({ success: true, result: result });
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};

//글 하나 생성 (버튼클릭)
exports.communityWrite = async (req, res) => {
    const id = req.userId;

    try {
        const {
            community_id,
            com_mail,
            com_division,
            com_title,
            con_content,
            // pd_picture
        } = req.body;
        console.log(req.body); //이걸로 프론트에서 주는값 받아오는지 확인가능
        const result = await Community.create({
            //boardId: Number(boardId),
            id: Number(id),
            community_id,
            com_mail,
            com_division,
            com_title,
            con_content,
        });
        console.log('result', result);
        res.json({ success: true, result: '' }); //result: result.id
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};
