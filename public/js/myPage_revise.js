window.onload = function () {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user_name');
    if (token) {
        document.querySelector(
            '.headbtn'
        ).innerHTML = `<span><a href="" class="mypage">${userName}</a>님 환영합니다💛</span>
      &nbsp;&nbsp;<button type = "button" onclick = "logout()" class = "logout">로그아웃</button>`;
    } else {
        document.querySelector('.headbtn').innerHTML = `<a href="/user/login" class="login">로그인</a>
           <a href="/user/signup" class="sign">회원가입</a>
           `;
    }
    //<a href="" class="mypage">마이페이지</a>
};
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    alert('로그아웃 되었습니다.');

    window.location.reload(); // 페이지를 새로고침하여 로그인 상태를 업데이트
}
//새 비밀번호 일치, 불일치 확인
function checkPassword() {
    const pw = document.getElementById('new-password').value;
    const check_pw = document.getElementById('confirm-new-password').value;
    const message = document.getElementById('pw_message');

    if (pw === check_pw) {
        message.textContent = '비밀번호가 일치합니다.';
        message.style.color = 'green'; // 일치하는 경우, 메시지 색상을 초록색으로 변경
    } else {
        message.textContent = '비밀번호가 일치하지 않습니다.';
        message.style.color = 'red'; // 일치하지 않는 경우, 메시지 색상을 빨간색으로 변경
    }
}
//비밀번호 8~16자로 제한
function maxLengthCheckPW(object) {
    if (object.value.length > 16) {
        object.value = object.value.slice(0, 10);
    }
}
//전화번호 11자로 제한
function maxLengthCheckNum(object) {
    if (object.value.length > 11) object.value = object.value.slice(0, 11);
}
function address_DaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraRoadAddr += extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraRoadAddr !== '') {
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample4_postcode').value = data.zonecode;
            document.getElementById('sample4_roadAddress').value = roadAddr;
            // document.getElementById('sample4_jibunAddress').value = data.jibunAddress;
        },
    }).open();
}

(async function () {
    const res = await axios({
        method: 'POST',
        url: '/api/user/info',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const {
        user_id,
        user_name,
        user_phoneNum,
        // user_age,
        user_email,
        // user_gender,
        user_website,
        user_nick,
        sample4_postcode,
        sample4_roadAddress,
        // sample4_jibunAddress,
        sample4_detailAddress,
    } = res.data.result;

    document.querySelector('#user_id').value = user_id;
    document.querySelector('#user_name').value = user_name;
    document.querySelector('#user_phoneNum').value = user_phoneNum;
    document.querySelector('#user_website').value = user_website;
    // document.querySelector('#user_age').value = user_age;
    document.querySelector('#user_email').value = user_email;
    // document.querySelector('#user_gender').value = user_gender;
    document.querySelector('#user_nick').value = user_nick;
    document.querySelector('#sample4_postcode').value = sample4_postcode;
    document.querySelector('#sample4_roadAddress').value = sample4_roadAddress;
    // document.querySelector('#sample4_jibunAddress').value = sample4_jibunAddress;
    document.querySelector('#sample4_detailAddress').value = sample4_detailAddress;
})();

//이떄 수정하기했을때 현재 비밀번호가 user_pw즉 db에 있는거랑 다르면 현재 비번 다르다 alert 뜨가
async function updateFunc() {
    const userId = document.querySelector('#user_id').value;
    const currentPassword1 = document.querySelector('#current-password');
    const newPassword1 = document.querySelector('#new-password');
    const confirmNewPassword1 = document.querySelector('#confirm-new-password');
    const userName = document.querySelector('#user_name').value;
    // const userAge = document.querySelector('#user_age').value;
    const userEmail = document.querySelector('#user_email').value;
    // const userGender = document.querySelector('#user_gender').value;
    const userWebsite = document.querySelector('#user_website').value;
    const userPhonenum = document.querySelector('#user_phoneNum').value;
    const userNick = document.querySelector('#user_nick').value;
    const postcode = document.querySelector('#sample4_postcode').value;
    const roadAddress = document.querySelector('#sample4_roadAddress').value;
    // const jibunAddress = document.querySelector('#sample4_jibunAddress').value;
    const detailAddress = document.querySelector('#sample4_detailAddress').value;

    const currentPassword = currentPassword1.value;
    const newPassword = newPassword1.value;
    const confirmNewPassword = confirmNewPassword1.value;

    if (newPassword && newPassword !== confirmNewPassword) {
        alert('새 비밀번호가 일치하지 않습니다.');
        newPassword1.value = '';
        confirmNewPassword1.value = '';
        return;
    }

    try {
        const res = await axios({
            method: 'PATCH',
            url: '/api/user/update',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: {
                userId,
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
            },
        });
        if (!res.data.success) {
            alert(res.data.message);
            return;
        }
        alert('정보가 수정되었습니다.');
    } catch (error) {
        console.error(error);
        alert(error.response.data.message);
        currentPassword1.value = '';
        newPassword1.value = '';
        confirmNewPassword1.value = '';
    }
}
//이때도 본인 비번 한번만 치게 하고 맞으면 탈퇴하게 하자
async function deleteFunc() {
    if (!confirm('탈퇴하시겠습니까?')) {
        return;
    }
    const res = await axios({
        method: 'DELETE',
        url: '/api/user/delete',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (res.data.success) {
        alert('탈퇴 완료되었습니다');
        document.location.href = '/';
    }
}
