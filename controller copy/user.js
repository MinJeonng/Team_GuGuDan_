const { User } = require('../models');
// , Profile
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); //비밀번호를 암호화 시키면서 가입하기 연습.

//회원가입

exports.signup = async (req, res) => {
    const { user_id, user_pw, user_name, user_age, user_email, user_gender, user_nick } = req.body;

    // // 입력값이 없는 경우 처리
    // if (!user_id || !user_pw || !user_name || !user_age || !user_email || !user_gender) {
    //     return res.status(400).json({ success: false, message: '입력값을 모두 채워주세요.' });
    // }

    //존재여부확인
    const find = await User.findOne({ where: { user_id } });
    console.log('find', find);

    try {
        if (find) {
            res.json({ success: false, message: '이미 존재하는 회원' });
        } else {
            const password = await bcrypt.hash(String(user_pw), 11); //await 쓰면 hashSync 안씀.
            //생성 create
            const result = await User.create({
                user_id,
                user_pw: password,
                user_name,
                user_age,
                user_email,
                user_gender,
                user_nick,
                // UserId: result.id,
            });
            console.log('signup', result);
            // const result2 = await Profile.create({
            //     user_name,
            //     user_age,
            //     user_email,
            //     UserId: result.id,
            // });
            // console.log('profile', result2);
            res.json({ success: true, result });
        }
    } catch (error) {
        console.log(error); //sequelize에러 일 경우에는 여기에 써야 에러가 뭔지 알 수 있음
        res.json(error);
    }
};
//로그인(아이디로)
exports.login = async (req, res) => {
    const { user_id, user_pw: pw } = req.body;

    //검색 findOne
    try {
        const loginResult = await User.findOne({ where: { user_id } });
        //console.log('login', result);

        const password = await bcrypt.compare(pw, loginResult.user_pw);
        //비밀번호 일치 시
        if (password) {
            //jwt토큰 발행
            const token = jwt.sign({ id: loginResult.id }, process.env.SECRET, { expiresIn: '1h' });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: '비밀번호가 틀립니다.' });
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};
//회원조회
//회원조회랑, 수정, 탈퇴는 모두 로그인을 하면 나타나게 하면 된다.
exports.findUser = async (req, res) => {
    const user_id = req.userId; //auth 미들웨어에서 보내주는값 //이걸 뭘로 할지는 추후 확인 decode를 보고
    console.log('유저 조회', user_id);
    try {
        const result = await User.findOne({ where: { id: Number(user_id) } });
        res.json({ success: true, result });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
    // const result = await Member.findByPk(id, {
    //     attributes: ['userId', 'password'],
    //     include: [{ model: Profile, attributes: ['username', 'age', 'email'] }],
    // });
    // console.log('result', result);
    // res.json({ success: true, result });
};
//정보수정
// exports.updateUser = async (req, res) => {
//     const user_id = req.userId;
//     const { user_pw, user_nick } = req.body;
//     // const { id } = req.user;
//     const result = await User.update({ user_pw, user_nick }, { where: { user_id } });
//     console.log('update', result);
//     // await Profile.update({ username, age, email }, { where: { memberId: id } });
//     res.json({ success: true });
// };
exports.updateUser = async (req, res) => {
    try {
        const user_id = req.userId;
        const {
            currentPassword,
            newPassword,
            userName,
            userAge,
            userEmail,
            userGender,
            userNick,
            postcode,
            roadAddress,
            jibunAddress,
            detailAddress,
        } = req.body;

        const user = await User.findOne({ where: { user_id } });
        if (!user) {
            res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다' });
            return;
        }
        const isMatch = await bcrypt.compare(currentPassword, user.user_pw);

        if (!isMatch) {
            res.status(400).json({ success: false, message: '현재 비밀번호가 틀립니다' });
            return;
        }

        let updateData = {
            userName,
            userAge,
            userEmail,
            userGender,
            userNick,
            postcode,
            roadAddress,
            jibunAddress,
            detailAddress,
        };

        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 5);
            updateData.user_pw = hashedPassword;
        }

        const result = await User.update(updateData, { where: { user_id } });
        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

//회원탈퇴
// exports.deleteUser = async (req, res) => {
//     //const { id } = req.user;
//     const user_id = req.userId;
//     const result = await User.destroy({ where: { user_id } });
//     console.log('delete', result);
//     res.json({ success: true });
// };
exports.deleteUser = async (req, res) => {
    try {
        const id = req.userId;
        const result = await User.destroy({ where: { id } });
        console.log('delete', result);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
