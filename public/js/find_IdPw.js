// const { response } = require('express');

function showIDconatainer() {
    var findIDcontainer = document.querySelector('#findIDcontainer');
    var findPWcontainer = document.querySelector('#findPWcontainer');

    findIDcontainer.classList.remove('hidden');

    findPWcontainer.classList.add('hidden');
}

function showPWcontainer() {
    var findIDcontainer = document.querySelector('#findIDcontainer');
    var findPWcontainer = document.querySelector('#findPWcontainer');

    findIDcontainer.classList.add('hidden');

    findPWcontainer.classList.remove('hidden');
}
//비밀번호 찾기에서 이메일 인증
let authNum = '';
let isChecked = false;

async function sendEmail() {
    const userId = document.getElementById('user_id').value;
    const userEmail = document.getElementById('user_email_pw').value;

    // userId가 제공되었는지 확인
    if (userId) {
        try {
            const response = await axios.post('/api/user/find-pw', { user_id: userId, user_email: userEmail });
            console.log(response.data.findUser);

            if (response.data.findUser) {
                console.log('비밀번호 찾기에서 아이디 일치확인');

                try {
                    const emailResponse = await axios.post('/api/user/email_pw', { user_email: userEmail });

                    if (emailResponse.data.ok) {
                        authNum = emailResponse.data.authNum;
                        alert('임시 비밀번호를 이메일로 전송했습니다.');
                        window.location.href = '/user/login';
                    } else {
                        alert('메일 전송에 실패하였습니다. 이메일 주소를 확인해주세요.');
                    }
                } catch (emailError) {
                    console.error(emailError);
                    alert('이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
            } else {
                alert('아이디 또는 이메일을 확인해주세요.');
                document.getElementById('user_id').value = '';
                document.getElementById('user_email_pw').value = '';
            }
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
    }
}

//아이디 찾기
async function confirmFindId() {
    const email = document.getElementById('user_email_id').value;
    console.log(email);

    const response = await axios({
        method: 'post',
        url: '/api/user/find-id',
        data: { user_email: email },
    });
    const { isID, result } = response.data;
    if (isID) {
        document.getElementById(
            'checkId'
        ).innerHTML = `회원님의 아이디는 <span style="color: blue; font-weight: bold;">${result}</span>입니다.
        <a href="/user/login" class="login">로그인 하러가기</a>`;
    } else {
        alert('이메일이 존재하지 않거나 일치하지 않습니다.');
        document.getElementById('user_email_id').value = '';
    }
}

//비밀번호 찾기에서 아이디, 이메일 존재여부를 따로따로 alert 줄 수 있는 방법?
// async function confirmFindPw() {
//     const userId = document.getElementById('user_id').value;
//     const userEmail = document.getElementById('user_email').value;

//     // userId를 직접 확인하는 대신, 빈 값인지만 체크하고 서버에 요청을 보냅니다.
//     if (userId || userEmail) {
//         const response = await axios.post('/api/user/find-pw', { user_id: userId, user_email: userEmail });

//         // 서버로부터의 응답에 따라 조건 분기
//         if (response.data.isId && response.data.isEmail) {
//             console.log('아이디와 이메일이 모두 일치합니다.');
//             // 아이디와 이메일이 모두 일치할 때의 동작
//         } else if (response.data.isId) {
//             console.log('아이디만 일치합니다.');
//             alert('이메일이 존재하지 않거나 일치하지 않습니다.');
//             // 아이디만 일치할 때의 동작
//         } else if (response.data.isEmail) {
//             console.log('이메일만 일치합니다.');
//             alert('아이디가 존재하지 않거나 일치하지 않습니다.');
//             // 이메일만 일치할 때의 동작
//         } else {
//             console.log(response.data.isEmail);
//             console.log(response.data.isId);
//             alert('아이디와 이메일이 존재하지 않거나 일치하지 않습니다.');
//             // 아이디와 이메일 모두 불일치할 때의 동작
//         }
//     } else {
//         // userId와 userEmail이 모두 비어 있는 경우
//         alert('아이디와 이메일을 입력해주세요.');
//     }
// }
