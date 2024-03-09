async function signupFunc() {
    var pw1 = document.getElementById('user_pw').value;
    var pw2 = document.getElementById('check_pw').value;
    if (pw1 != pw2) {
        alert('비밀번호가 일치 하지 않습니다');
        return false;
    }

    const form = document.forms['signup-form'];
    const data = {
        user_personal: form.personal_type.value,
        user_id: form.user_id.value,
        user_pw: form.user_pw.value,
        user_name: form.user_name.value,
        //user_age: form.user_age.value,
        user_email: form.user_email.value,
        //user_gender: form.user_gender.value,
        user_phoneNum: form.user_phoneNum.value,
        user_website: form.user_website.value,
        user_nick: form.user_nick.value,
        user_postCode: form.sample4_postcode.value,
        user_roadAddress: form.sample4_roadAddress.value,
        //sample4_jibunAddress: form.sample4_jibunAddress.value,
        user_detailAddress: form.sample4_detailAddress.value,
    };
    // 입력값이 없는 경우 팝업 경고창을 띄우고 함수 종료 // 'user_website', sample4_detailAddress는 제외
    for (const key in data) {
        if (key !== 'user_website' && key !== 'sample4_detailAddress' && !data[key]) {
            alert('입력값을 모두 채워주세요.');
            return;
        }
    }

    if (user_nick.length < 3) {
        alert('닉네임은 최소 3자 이상 입력해야 합니다.');
        object.value = '';
        return; // 함수 실행 종료
    }
    if (user_pw.length < 8) {
        alert('비밀번호는 최소 8자 이상 입력해야 합니다.');
        object.value = '';
        return;
    }
    if (user_id.length < 5) {
        alert('아이디는 최소 5자 이상 입력해야 합니다.');
        object.value = '';
        return;
    }

    const res = await axios({
        method: 'POST',
        url: '/api/user/signup',
        data,
    });
    console.log(res);
    if (res.data.success) {
        alert('회원가입을 축하드립니다.');
        document.location.href = '/user/login';
    } else {
        alert('이미 존재하는 아이디입니다.');
    }
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

            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            // if (roadAddr !== '') {
            //     document.getElementById('sample4_extraAddress').value = extraRoadAddr;
            // } else {
            //     document.getElementById('sample4_extraAddress').value = '';
            // }

            // var guideTextBox = document.getElementById('guide');
            // // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            // if (data.autoRoadAddress) {
            //     var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            //     guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
            //     guideTextBox.style.display = 'block';
            // } else if (data.autoJibunAddress) {
            //     var expJibunAddr = data.autoJibunAddress;
            //     guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
            //     guideTextBox.style.display = 'block';
            // } else {
            //     guideTextBox.innerHTML = '';
            //     guideTextBox.style.display = 'none';
            // }
        },
    }).open();
}
//닉네임 3~10자로 제한
function maxLengthCheckNick(object) {
    if (object.value.length > 10) {
        object.value = object.value.slice(0, 10);
    }
}

//비밀번호 8~16자로 제한
function maxLengthCheckPW(object) {
    if (object.value.length > 16) {
        object.value = object.value.slice(0, 10);
    }
}
//아이디 5~10자로 제한
function maxLengthCheckId(object) {
    if (object.value.length > 10) {
        object.value = object.value.slice(0, 10);
    }
}
//전화번호 11자로 제한
function maxLengthCheckNum(object) {
    if (object.value.length > 11) object.value = object.value.slice(0, 11);
}
//비밀번호 일치, 불일치 확인
function checkPassword() {
    const pw = document.getElementById('user_pw').value;
    const check_pw = document.getElementById('check_pw').value;
    const message = document.getElementById('pw_message');

    if (pw === check_pw) {
        message.textContent = '비밀번호가 일치합니다.';
        message.style.color = 'green'; // 일치하는 경우, 메시지 색상을 초록색으로 변경
    } else {
        message.textContent = '비밀번호가 일치하지 않습니다.';
        message.style.color = 'red'; // 일치하지 않는 경우, 메시지 색상을 빨간색으로 변경
    }
}
