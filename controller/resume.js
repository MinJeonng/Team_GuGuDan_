const { Resume } = require('../models');
const { User } = require('../models');
// const { User } = require('../models');

exports.resumeRegister = async (req, res) => {
    //왜래키 가져오기.
    const id = req.userId;
    // console.log('write_id', write_id);
    try {
        const {
            // gender,
            // birth,
            home_num,
            phone_num,
            contact_method,
            edu,
            carrer,
            wish_form,
            wish_category,
            wish_occupation,
            wish_salary,
            wish_city,
            wish_town,
            resume_title,
            resume_detail,
        } = req.body;
        const result = await Resume.create({
            userId: Number(id),
            phone_num,
            // gender,
            // birth,
            home_num,
            contact_method,
            edu,
            carrer,
            wish_form,
            wish_category,
            wish_occupation,
            wish_salary,
            wish_city,
            wish_town,
            resume_title,
            resume_detail,
        });
        console.log('result', result);
        res.json({ success: true, result: '' }); //result: result.id
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
    // try {
    // } catch (error) {
    //     console.log(error);
    //     res.json({ success: false, result: error });
    // }
};

exports.userInfo = async (req, res) => {
    const id = req.userId;
    const result = await User.findOne({ where: { id } });
    res.json({ success: true, result });
};

// //1개 조회
// exports.boardDetail = async (req, res) => {
//     try {
//         //req.params.id = 작성자
//         console.log('req.params.id', req.params.id);
//         //content 모델 내용 가져오기
//         const result = await Market.findByPk(req.params.id);
//         res.json({ success: true, result: result }); //result.userId를 가지고 프론트에서
//     } catch {
//         console.log(error);
//         res.json({ success: false, result: error });
//     }
// };

exports.boardAll = async (req, res) => {
    const userId = req.userId;
    try {
        const result = await Resume.findAll({ where: { userId } });
        console.log('all', result);
        res.json({ success: true, result: result });
    } catch (error) {
        console.log(error);
        res.json({ success: false, result: error });
    }
};

exports.boardDetail = async (req, res) => {
    try {
        //req.params.id = 작성자
        //content 모델 내용 가져오기
        const result = await Resume.findByPk(req.params.id);
        res.json({ success: true, result: result }); //result.userId를 가지고 프론트에서
    } catch {
        console.log(error);
        res.json({ success: false, result: error });
    }
};
