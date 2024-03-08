const { Resume } = require('../models');

exports.resumeRegister = async (req, res) => {
    //왜래키 가져오기.
    resumeId = req.resumeId;
    // console.log('write_id', write_id);
    try {
        const {
            home_num,
            phon_num,
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
            userId: Number(userId),
            home_num,
            phon_num,
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
