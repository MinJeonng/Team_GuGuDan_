const { User } = require('../models');
const { smtpTransport } = require('../config/email');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); //비밀번호를 암호화 시키면서 가입하기 연습.

//회원가입

exports.signup = async (req, res) => {
    const {
        user_personal,
        user_id,
        user_pw,
        user_name,
        user_email,
        user_nick,
        user_phoneNum,
        user_website,
        user_postCode,
        user_roadAddress,
        user_detailAddress,
    } = req.body;

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
                user_personal,
                user_id,
                user_pw: password,
                user_name,
                // user_age,
                user_email,
                // user_gender,
                user_nick,
                user_phoneNum,
                user_website,
                user_postCode,
                user_roadAddress,
                user_detailAddress,

                // UserId: result.id,
            });
            console.log('signup', result);

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

    // 검색 findOne
    try {
        const loginResult = await User.findOne({ where: { user_id } });

        const password = await bcrypt.compare(pw, loginResult.user_pw);
        // 비밀번호 일치 시
        if (password) {
            // jwt토큰 발행
            const token = jwt.sign({ id: loginResult.id }, process.env.SECRET, { expiresIn: '24h' });
            res.json({ success: true, token, user_name: loginResult.user_name });
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

//닉네임 중복확인
exports.checkDuplicateNick = async (req, res) => {
    try {
        const { user_nick } = req.body;
        // 데이터베이스에서 닉네임 검색
        const user = await User.findOne({ where: { user_nick: user_nick } });
        if (user) {
            // console.log()
            // 사용자가 발견되면 닉네임이 중복됨
            res.json({ isDuplicate: true });
        } else {
            // 사용자가 발견되지 않으면 닉네임이 중복되지 않음
            res.json({ isDuplicate: false });
        }
    } catch (error) {
        // 오류 처리
        res.status(500).send({ message: '서버 오류가 발생했습니다.' });
    }
};
//아이디 중복 확인
exports.checkDuplicateId = async (req, res) => {
    try {
        const { user_id } = req.body;
        // 데이터베이스에서 닉네임 검색
        const user = await User.findOne({ where: { user_id: user_id } });
        if (user) {
            // 사용자가 발견되면 닉네임이 중복됨
            res.json({ isDuplicate: true });
        } else {
            // 사용자가 발견되지 않으면 닉네임이 중복되지 않음
            res.json({ isDuplicate: false });
        }
    } catch (error) {
        // 오류 처리
        res.status(500).send({ message: '서버 오류가 발생했습니다.' });
    }
};

// //비밀번호 찾기에서 아이디와 이메일 존재여부 확인
// exports.sendEmail = async (req, res) => {
//     try {
//         const { user_id, user_email } = req.body;
//         const user = await User.findOne({ where: { user_id, user_email } });

//         console.log('user', user);
//         if (user) {
//             // console.log('userid', req.body);
//             res.json({ findUser: true, message: '존재하고 있는 회원' });
//         } else {
//             res.json({ findUser: false });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: '서버 오류가 발생했습니다.' });
//     }
// };

exports.sendEmail = async (req, res) => {
    try {
        const { user_id, user_email } = req.body;
        const user = await User.findOne({ where: { user_id, user_email } });

        console.log('user', user);
        if (user) {
            const temporaryPassword = generateRandomPassword();
            const hashedPassword = await bcrypt.hash(String(temporaryPassword), 10);

            await User.update({ where: { user_pw: hashedPassword } });
            // res.json({ success: true });
            // 비밀번호를 새로운 DB에 업데이트
            // await user.update({ user_pw: hashedPassword });

            res.json({ findUser: true, message: '존재하고 있는 회원' });
        } else {
            res.json({ findUser: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: '서버 오류가 발생했습니다.' });
    }
};

exports.emailAuth_pw = async (req, res) => {
    const number = generateRandomPassword(111111, 999999);

    const { user_email } = req.body;
    try {
        const mailOptions = {
            from: `고가네 <sally3921@naver.com>`,
            to: user_email,
            subject: '고가네🧸 임시 비밀번호 인증메일 입니다.',
            html: `<h2>고가네 사이트 입니다🧸</h2><br /><h3>아래의 임시 비밀번호 6자리를 입력해주세요. 반드시 비밀번호를 변경해주세요 : </h3>${number}`,
        };
        smtpTransport.sendMail(mailOptions, (err, response) => {
            console.log('response', response);
            if (err) {
                res.json({ ok: false, msg: '메일 전송에 실패하였습니다.' });
                smtpTransport.close();
                return;
            } else {
                res.json({ ok: true, msg: '메일 전송에 성공하였습니다.', authNum: number });
                smtpTransport.close();
                return;
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: '서버 오류가 발생했습니다.' });
    }
};

// 랜덤한 비밀번호 생성 함수
function generateRandomPassword(min = 111111, max = 999999) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 랜덤한 비밀번호 생성 함수
// function generateRandomPassword() {
//     const length = 8;
//     const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let password = '';
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * charset.length);
//         password += charset[randomIndex];
//     }
//     return password;
// }

//아이디 찾기
exports.findID = async (req, res) => {
    const { user_email } = req.body;
    try {
        const user = await User.findOne({ where: { user_email } });
        console.log('user', user);
        if (user) {
            res.json({ isID: true, result: user.user_id }); // 유저 ID만 전송
            console.log('result', user.user_id);
        } else {
            res.json({ isID: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: '서버 오류가 발생했습니다.' });
    }
};

//비밀번호 찾기에서 각각 아이디, 이메일 존재여부 확인
/*
exports.confirmFindPw = async (req, res) => {
    try {
        const { user_id, user_email } = req.body;

        // 먼저 user_id를 기준으로 사용자를 찾습니다.
        const userById = await User.findOne({ where: { user_id } });

        // user_id로 찾은 결과가 없다면, user_email을 기준으로 사용자를 찾습니다.
        // const userByEmail = userById ? null : await User.findOne({ where: { user_email } });
        const userByEmail = await User.findOne({ where: { user_email } });
        // 둘 다 없는 경우
        if (!userById && !userByEmail) {
            res.json({ isId: false, isEmail: false, message: '아이디와 이메일 모두 존재하지 않습니다.' });
        }
        // user_id는 존재하지만, user_email은 존재하지 않는 경우
        else if (userById && !userByEmail) {
            res.json({ isId: true, isEmail: false, message: '아이디는 존재하지만 이메일은 존재하지 않습니다.' });
        }
        // user_id는 없고, user_email만 존재하는 경우
        else if (!userById && userByEmail) {
            res.json({ isId: false, isEmail: true, message: '이메일은 존재하지만 아이디는 존재하지 않습니다.' });
        }
        // 둘 다 존재하는 경우 (이 경우는 user_id로 이미 조회했기 때문에 자동적으로 이메일도 일치한다고 볼 수 있습니다.)
        else if (userById && userByEmail) {
            res.json({ isId: true, isEmail: true, message: '아이디와 이메일 모두 존재합니다.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: '서버 오류가 발생했습니다.' });
    }
};
*/

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
        console.log(user_id);
        const {
            // user_id,
            currentPassword,
            newPassword,
            userName,
            userWebsite,
            userPhonenum,
            // userAge,
            userEmail,
            // userGender,
            userNick,
            postcode,
            roadAddress,
            // jibunAddress,
            detailAddress,
        } = req.body;

        const user = await User.findOne({ where: { id: user_id } });
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
            // userAge,
            userEmail,
            userWebsite,
            userPhonenum,
            // userGender,
            userNick,
            postcode,
            roadAddress,
            // jibunAddress,
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

//이메일 인증
exports.emailAuth = async (req, res) => {
    const number = generateRandomNumber(111111, 999999);

    const { user_email } = req.body; //사용자가 입력한 이메일
    try {
        const mailOptions = {
            from: `고가네 <sally3921@naver.com>`, // 발신자 이메일 주소.
            to: user_email, //사용자가 입력한 이메일 -> 목적지 주소 이메일
            subject: '고가네🧸 인증 관련 메일 입니다.',
            html: '<h2>고가네 사이트 입니다🧸</h2><br /><h3>아래의 숫자 6자리를 입력해주세요 : </h3>' + number,
        };
        smtpTransport.sendMail(mailOptions, (err, response) => {
            console.log('response', response);
            //첫번째 인자는 위에서 설정한 mailOption을 넣어주고 두번째 인자로는 콜백함수.
            if (err) {
                res.json({ ok: false, msg: ' 메일 전송에 실패하였습니다. ' });
                smtpTransport.close(); //전송종료
                return;
            } else {
                res.json({ ok: true, msg: ' 메일 전송에 성공하였습니다. ', authNum: number });
                smtpTransport.close(); //전송종료
                return;
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const generateRandomNumber = function (min, max) {
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
};

