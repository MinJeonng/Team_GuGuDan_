const { Market } = require('../models');
const { User } = require('../models');

//게시글 전체 조회  => 경로 ?
exports.boardAll = async (req, res) => {
    try {
        const result = await Market.findAll({ order: [['id', 'desc']] });
        console.log('all', result);
        res.json({ success: true, result: result });
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};

//1개 조회
exports.boardDetail = async (req, res) => {
    try {
        //req.params.id = 작성자
        console.log('req.params.id', req.params.id);
        //content 모델 내용 가져오기
        const result = await Market.findByPk(req.params.id);
        res.json({ success: true, result: result }); //result.userId를 가지고 프론트에서
    } catch {
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
            location_town,
            location_detail,
            pd_content,
            // pd_picture
        } = req.body;
        console.log(req.body); //이걸로 프론트에서 주는값 받아오는지 확인가능
        const result = await Market.create({
            //boardId: Number(boardId),
            userid: Number(id),
            seller_id,
            seller_ph,
            pd_status,
            category,
            pd_title,
            pd_division,
            pd_price,
            pd_mail,
            location_city,
            location_town,
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

// // 회원조회
// exports.find = async (req, res) => {
//     const { id } = req.user;
//     const result = await User.findOne({ where: { id } });
//     res.json({ success: true, result });
// };

// // 채팅 추가
// exports.chat = async (req, res) => {
//     const { userId, username, chatMsg, groupId } = req.body;
//     const result = await Chat.create({ userId, username, chatMsg, groupId });
//     res.json({ success: true, result, message: '채팅 추가 완료' });
// };
