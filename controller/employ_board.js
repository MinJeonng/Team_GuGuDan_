const { Content } = require('../models');

//전체 글 조회
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

//게시글 클릭하면 들어가서 구인글 볼 수 있게 하나만 조회하는 것
//1개 조회
exports.boardDetail = async (req, res) => {
    try {
        //req.params.id = 작성자
        console.log('req.params.id', req.params.id);
        //content 모델 내용 가져오기
        const result = await Content.findByPk(req.params.id);
        res.json({ success: true, result: result }); //result.userId를 가지고 프론트에서
    } catch {
        console.log(error);
        res.json({ success: false, result: error });
    }
};

//하나 생성
exports.boardWrite = async (req, res) => {
    userId = req.userId;
    // console.log('write_id', write_id);
    try {
        const {
            //생성할땐 user_id를 가지고 오지 않음, 조회할때만 가지고오자.
            title,
            place_name,
            city_name,
            town_name,
            place_address,
            homepage,
            job,
            career,
            salary,
            deadline,
            content,
            //password,
        } = req.body;
        const result = await Content.create({
            //boardId: Number(boardId),
            userId: Number(userId),
            title,
            place_name,
            city_name,
            town_name,
            place_address,
            homepage,
            job,
            career,
            salary,
            deadline,
            content,
        });
        console.log('result', result);
        res.json({ success: true, result: '' }); //result: result.id
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};
//하나 수정
exports.boardUpdate = async (req, res) => {
    const userId = req.userId;
    console.log(userId);
    const id = req.params.id;
    const {
        title,
        place_name,
        city_name,
        town_name,
        place_address,
        homepage,
        job,
        career,
        salary,
        deadline,
        content,
        //password,
    } = req.body; //프론트에서 받아오는 값.????
    // 게시물의 작성자와 요청한 사용자가 일치하는지 확인
    const content_user = await Content.findOne({ where: { id } }); //작성자 id
    if (content_user.userId !== userId) {
        return res.status(403).json({ success: false, result: '작성자와 로그인 유저가 다릅니다.' });
    }
    try {
        // userId == write_id ? (is_mine = true) : (is_mine = false);
        const result = await Content.update(
            {
                //userId: Number(userId),
                title,
                place_name,
                city_name,
                town_name,
                place_address,
                homepage,
                job,
                career,
                salary,
                deadline,
                content,
                //password,
                //is_mine,
            },
            { where: { id } }
        );
        console.log('update', result);
        res.json({ success: true, result: '' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};
//하나 삭제
exports.boardDelete = async (req, res) => {
    const userId = req.userId;
    console.log(userId);
    const id = req.params.id;
    try {
        const content_user = await Content.findOne({ where: { id } }); //작성자 id
        if (content_user.userId !== userId) {
            return res.status(403).json({ success: false, result: '작성자와 로그인 유저가 다릅니다.' });
        }
        //const { user_id: userId } = req.body;
        const result = await Content.destroy({ where: { id } });
        console.log('delete', result);
        res.json({ success: true, result: '' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};
