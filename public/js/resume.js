// 체크박스 3개, 10개 이상 못선택하게 하기
function limitCheckboxSelection(checkboxName, maxCount) {
    var checkboxes = document.querySelectorAll('input[name="' + checkboxName + '"]');
    var checkedCount = 0;

    // 체크된 체크박스 개수 세기
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            checkedCount++;
        }
    });

    // 체크된 체크박스가 maxCount 이상이라면, 체크되지 않은 체크박스 비활성화
    checkboxes.forEach(function (checkbox) {
        checkbox.disabled = checkbox.checked ? false : checkedCount < maxCount ? false : true;
    });
}

// 체크박스 그룹에 대한 이벤트 리스너 추가
function addCheckboxListener(groupName, maxCount) {
    var checkboxes = document.querySelectorAll('input[name="' + groupName + '"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            limitCheckboxSelection(groupName, maxCount);
        });
    });
}

// 각 체크박스 그룹에 대한 이벤트 리스너 추가
addCheckboxListener('hopework', 3); // 최대 3개 선택
addCheckboxListener('hopejob', 10); // 최대 10개 선택

// 1. 지역 선택 select 누르면 시군구 선택 select 나오게 하기
document.addEventListener('DOMContentLoaded', function () {
    // waselect1 요소 선택
    var waselect1 = document.querySelector('.waselect1');
    // waselect2 요소 선택
    var waselect2 = document.querySelector('.waselect2');

    var waselect2box = document.querySelector('.waselect2box');

    // waselect1의 변경 이벤트 감지
    waselect1.addEventListener('change', function () {
        // 현재 선택된 지역
        var selectedRegion = waselect1.value;

        // waselect2 요소 초기화
        waselect2.innerHTML = '';

        if (selectedRegion !== '지역 선택') {
            waselect2box.style.display = 'block';
        } else {
            // '지역 선택'인 경우 숨깁니다.
            waselect2box.style.display = 'none';
        }

        // 선택된 지역에 따라 waselect2의 옵션을 설정
        switch (selectedRegion) {
            case '서울':
                addOptions([
                    '시/군/구 선택',
                    '강남구',
                    '강북구',
                    '강동구',
                    '강서구',
                    '관악구',
                    '광진구',
                    '구로구',
                    '금천구',
                    '도봉구',
                    '동대문구',
                    '동작구',
                    '마포구',
                    '서대문구',
                    '성동구',
                    '성북구',
                    '송파구',
                    '양천구',
                    '영등포구',
                    '용산구',
                    '은평구',
                    '종로구',
                    '중구',
                    '중랑구',
                ]);
                break;
            case '경기':
                addOptions([
                    '시/군/구 선택',
                    '가평군',
                    '고양시',
                    '과천시',
                    '광명시',
                    '광주시',
                    '구리시',
                    '군포시',
                    '김포시',
                    '남양주시',
                    '동두천시',
                    '부천시',
                    '성남시',
                    '수원시',
                    '시흥시',
                    '안산시',
                    '안성시',
                    '안양시',
                    '양주시',
                    '양평군',
                    '여주군',
                    '연천군',
                    '오산시',
                    '용인시',
                    '의왕시',
                    '의정부시',
                    '이천시',
                    '파주시',
                    '평택시',
                    '포천시',
                    '하남시',
                    '화성시',
                ]);
                break;
            case '인천':
                addOptions([
                    '시/군/구 선택',
                    '강화군',
                    '계양구',
                    '남구',
                    '남동구',
                    '동구',
                    '부평구',
                    '서구',
                    '연수구',
                    '옹진군',
                    '중구',
                ]);
                break;
            case '부산':
                addOptions([
                    '시/군/구 선택',
                    '강서구',
                    '금정구',
                    '기장군',
                    '남구',
                    '동구',
                    '동래구',
                    '부산진구',
                    '북구',
                    '사상구',
                    '사하구',
                    '서구',
                    '수영구',
                    '연제구',
                    '영도구',
                    '중구',
                    '해운대구',
                ]);
                break;
            case '대구':
                addOptions(['시/군/구 선택', '남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구']);
                break;
            case '대전':
                addOptions(['시/군/구 선택', '대덕구', '동구', '서구', '유성구', '중구']);
                break;
            case '광주':
                addOptions(['시/군/구 선택', '광산구', '남구', '동구', '북구', '서구']);
                break;
            case '울산':
                addOptions(['시/군/구 선택', '남구', '동구', '북구', '중구', '울주군']);
                break;
            case '세종시':
                waselect2.style.display = 'none';

                break;
            case '강원':
                addOptions([
                    '시/군/구 선택',
                    '강릉시',
                    '고성군',
                    '동해시',
                    '삼척시',
                    '속초시',
                    '양구군',
                    '양양군',
                    '영월군',
                    '인제군',
                    '원주시',
                    '정선군',
                    '철원군',
                    '춘천시',
                    '태백시',
                    '평창군',
                    '홍천군',
                    '화천군',
                    '횡성군',
                ]);
                break;
            case '경남':
                addOptions([
                    '시/군/구 선택',
                    '거제시',
                    '거창군',
                    '고성군',
                    '김해시',
                    '남해군',
                    '마산시',
                    '밀양시',
                    '사천시',
                    '산청군',
                    '양산시',
                    '의령군',
                    '진주시',
                    '진해시',
                    '창녕군',
                    '창원시',
                    '통영시',
                    '하동군',
                    '함안군',
                    '함양군',
                    '합천군',
                ]);
                break;
            case '경북':
                addOptions([
                    '시/군/구 선택',
                    '경산시',
                    '경주시',
                    '고령군',
                    '군위군',
                    '구미시',
                    '김천시',
                    '문경시',
                    '봉화군',
                    '상주시',
                    '성주군',
                    '안동시',
                    '영덕군',
                    '영양군',
                    '영주시',
                    '영천시',
                    '예천군',
                    '울릉군',
                    '울진군',
                    '의성군',
                    '청도군',
                    '청송군',
                    '칠곡군',
                    '포항시',
                ]);
                break;
            case '전남':
                addOptions([
                    '시/군/구 선택',
                    '강진군',
                    '고흥군',
                    '곡성군',
                    '구례군',
                    '광양시',
                    '나주시',
                    '담양군',
                    '목포시',
                    '무안군',
                    '보성군',
                    '순천시',
                    '신안군',
                    '여수시',
                    '영광군',
                    '영암군',
                    '완도군',
                    '장성군',
                    '장흥군',
                    '진도군',
                    '함평군',
                    '해남군',
                    '화순군',
                ]);
                break;
            case '전북':
                addOptions([
                    '시/군/구 선택',
                    '고창군',
                    '군산시',
                    '김제시',
                    '남원시',
                    '무주군',
                    '부안군',
                    '순창군',
                    '완주군',
                    '익산시',
                    '임실군',
                    '장수군',
                    '전주시',
                    '정읍시',
                    '진안군',
                ]);
                break;
            case '충남':
                addOptions([
                    '시/군/구 선택',
                    '계룡시',
                    '공주시',
                    '금산군',
                    '논산시',
                    '당진군',
                    '보령시',
                    '부여군',
                    '서산시',
                    '서천군',
                    '아산시',
                    '연기군',
                    '예산군',
                    '천안시',
                    '청양군',
                    '태안군',
                    '홍성군',
                ]);
                break;
            case '충북':
                addOptions([
                    '시/군/구 선택',
                    '괴산군',
                    '단양군',
                    '보은군',
                    '영동군',
                    '옥천군',
                    '음성군',
                    '증평군',
                    '진천군',
                    '제천시',
                    '청원군',
                    '청주시',
                    '충주시',
                ]);
                break;
            case '제주':
                addOptions(['시/군/구 선택', '서귀포시', '제주시']);
                break;
            case '해외':
                addOptions(['나라 선택', '중국', '홍콩', '일본']);
                break;
        }
    });

    // waselect2에 옵션을 추가하는 함수
    function addOptions(optionsArray) {
        optionsArray.forEach(function (optionText) {
            var option = document.createElement('option');
            option.textContent = optionText;
            waselect2.appendChild(option);
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var waselect1 = document.querySelector('.waselect1');
    var waselect2 = document.querySelector('.waselect2');

    var selectedResult = document.querySelector('.selectedresult');

    // 선택된 값이 변경될 때마다 updateSelected 함수를 호출합니다.
    waselect1.addEventListener('change', updateSelected);
    waselect2.addEventListener('change', updateSelected);
    var selectedResult = document.querySelector('.selectedresult');
    var selectedValues = [];

    function updateSelected() {
        if (waselect1.value !== '지역 선택' && waselect2.value === '시/군/구 선택') {
            selectedResult.value = '';
        }
        if (waselect1.value !== '지역 선택') {
            selectedValues.push(waselect1.value);
            if (waselect2.value !== '시/군/구 선택') {
                selectedValues.push(waselect2.value);
            }
        }
        if (selectedValues.length > 10) {
            // 5개 이상 선택 시 마지막 항목을 제거합니다.
            selectedValues.pop();
            selectedValues.pop();
            alert('최대 5개까지 선택할 수 있습니다.');
        }

        selectedResult.value = selectedValues.join(' '); //
    }
});

(async function () {
    const res = await axios({
        method: 'GET',
        url: `/api/resume/userInfo/`,

        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    const { user_name, user_email, user_phoneNum, user_roadAddress, user_detailAddress } = res.data.result;
    const address = `${user_roadAddress} ${user_detailAddress}`;

    document.querySelector('#name').innerText = user_name;
    document.querySelector('#resume_name').value = user_name;
    // document.querySelector('#birth').innerText = address;
    // document.querySelector('#gender').innerText = phoneNum;
    document.querySelector('#email').value = user_email;
    document.querySelector('#adress').value = address;
    // document.querySelector('#tel').innerText = salary;
    document.querySelector('#phone').value = user_phoneNum;
    console.log(res.data.result);
})();

async function resumRegiter() {
    //배열로 받아오기.
    const checkedCommu = Array.from(document.querySelectorAll('input[name="commucheck"]:checked')).map(
        (checkbox) => checkbox.value
    );
    //배열을 단일값으로
    const concatenatedCommu = checkedCommu.join(', ');
    const checkedForm = Array.from(document.querySelectorAll('.checkform:checked')).map((checkbox) => checkbox.value);
    const concatenatedForm = checkedForm.join(', ');
    const checkedHopeworks = Array.from(document.querySelectorAll('input[name="hopework"]:checked')).map(
        (checkbox) => checkbox.value
    );
    const concatenatedWork = checkedHopeworks.join(', ');
    const checkedHopejob = Array.from(document.querySelectorAll('input[name="hopejob"]:checked')).map(
        (checkbox) => checkbox.value
    );
    const concatenatedJob = checkedHopejob.join(', ');
    const data = {
        // gender: document.querySelector('#gender').value,
        // birth: document.querySelector('#birth').value,
        home_num: document.querySelector('#tel').value,
        carrer: document.querySelector('#careerselect').value,
        edu: document.querySelector('#eduselect').value,
        wish_salary: document.querySelector('#hopesaleselect').value,
        //중복 체크박스 단일형태로로 받기.
        contact_method: concatenatedCommu,
        wish_form: concatenatedForm,
        wish_category: concatenatedWork,
        wish_occupation: concatenatedJob,
        //
        wish_city: document.querySelector('.waselect1').value,
        wish_town: document.querySelector('.waselect2').value,
        resume_title: document.querySelector('#resumetitle').value,
        resume_detail: document.querySelector('#detailcontent').value,
    };

    const res = await axios({
        method: 'POST',
        url: '/api/resume/register',
        data,

        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    console.log('res', res);
    const { success, result } = res.data;
    console.log(res.data);
    if (success) {
        alert('등록되었습니다');
        document.location.href = '/resume/mypage';
    }
}
// window.onload = function () {
//     const token = localStorage.getItem('token');
//     const userName = localStorage.getItem('user_name');
//     if (token) {
//         document.querySelector(
//             '.headbtn'
//         ).innerHTML = `<span><a href="/resume/mypage" class="mypage">${userName}</a>님 환영합니다💛</span>
//         &nbsp;&nbsp;<button type = "button" onclick = "logout()" class = "logout">로그아웃</button>`;
//     } else {
//         document.querySelector('.headbtn').innerHTML = `<a href="/user/login" class="login">로그인</a>
//              <a href="/user/signup" class="sign">회원가입</a>
//              `;
//     }
//     //<a href="" class="mypage">마이페이지</a>
// };
// function logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user_name');
//     alert('로그아웃 되었습니다.');
//     window.location.href = '/';

//     // window.location.reload(); // 페이지를 새로고침하여 로그인 상태를 업데이트
// }
//전화번호 11자로 제한
function maxLengthCheck(object) {
    if (object.value.length > 11) object.value = object.value.slice(0, 11);
}
