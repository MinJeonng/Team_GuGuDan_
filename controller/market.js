const { Content } = require('../models');

//게시글 전체 조회  => 경로 ?
exports.boardAll = async (req, res) => {
    try {
        const result = await Content.findAll({ order: [['id', 'desc']] });
        console.log('all', result);
        res.json({ success: true, result: result });
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};

//글 하나 생성 (버튼클릭)
exports.marketWrite = async (req, res) => {
    const id = req.userId;

    try {
        const {
            seller_id,
            seller_ph,
            pd_status,
            category,
            pd_title,
            pd_division,
            pd_price,
            pd_mail,
            location_city,
            location_detail,
            pd_content,
            // pd_picture
        } = req.body;
        console.log(req.body); //이걸로 프론트에서 주는값 받아오는지 확인가능
        const result = await Content.create({
            //boardId: Number(boardId),
            id: Number(id),
            seller_id,
            seller_ph,
            pd_status,
            category,
            pd_title,
            pd_division,
            pd_price,
            pd_mail,
            location_city,
            location_detail,
            pd_content,
        });
        console.log('result', result);
        res.json({ success: true, result: '' }); //result: result.id
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};