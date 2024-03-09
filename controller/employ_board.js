const { Content } = require('../models');

//페이지네이션
// exports.paginate = async function paginate(model, where, order, page = 1, limit = 8) {
//     try {
//         const offset = (page - 1) * limit;
//         const result = await model.findAll({
//             where: where,
//             order: order,
//             limit: limit,
//             offset: offset,
//         });
//         const totalCount = await model.count({ where: where });
//         const lastPage = Math.ceil(totalCount / limit);
//         const startPage = Math.floor((page - 1) / 8) * 8 + 1;
//         return { result, startPage, lastPage, currentPage: page };
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };

//전체 글 조회
// exports.boardAll = async (req, res) => {
//     const page = Number(req.query.page) || 1;
//     console.log(req.query.page);

//     // console.log(`Page: ${page}`);
//     try {
//         const pagination = await paginate(Content, {}, [['id', 'desc']], page);
//         // res.render('employ/employ_main', pagination);
//         res.json(pagination);
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

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
// exports.searchEmploy = async (req, res) => {
//     const { page = 1, job, city_name, town_name } = req.query;
//     const where = {};
//     if (job) where.job = job;
//     if (city_name) where.city_name = city_name;
//     if (town_name) where.town_name = town_name;
//     try {
//         const pagination = await paginate(Content, where, page);
//         // res.render('employ/employ_main', pagination);
//         res.json(pagination);
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };
exports.searchEmploy = async (req, res) => {
    const { career, job, city_name, town_name } = req.query;
    const where = {
        job,
        city_name,
    };
    if (town_name) where.town_name = town_name;
    if (career) where.career = career;

    try {
        const result = await Content.findAll({ where });
        res.json({ success: true, result: result });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

    // const limit = 8;
    // const offset = (page - 1) * limit;
    // try {
    //     const result = await Content.findAll({
    //         where: {
    //             job,
    //             city_name,
    //             town_name,
    //             career,
    //         },
    // where: where,
    // limit: limit,
    // offset: offset,
    // });
    // const totalCount = await Content.count({ where: where });
    // const lastPage = Math.ceil(totalCount / limit);
    // const startPage = Math.floor((page - 1) / 8) * 8 + 1;
    // console.log(startPage);
    // res.json({ success: true, result: result }); //lastPage: lastPage, startPage: startPage
    // res.render('employ/employ_main', {
    //     result: result,
    //     startPage: startPage,
    //     lastPage: lastPage,
    //     // currentPage: page,
    // });
    // } catch (error) {
    //     console.log(error);
    //     res.json({ success: false, message: error.message });
    // }
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
    const id = req.userId; //이게 말그대로 content db에 있는 id를 외래키 userId로 하겠다는 의미!
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
            contents,
            phoneNum,
            education,
            //password,
        } = req.body;
        console.log(req.body); //이걸로 프론트에서 주는값 받아오는지 확인가능
        const result = await Content.create({
            //boardId: Number(boardId),
            userId: Number(id),
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
            contents,
            phoneNum,
            education,
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
