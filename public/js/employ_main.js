// 1. 지역 선택 select 누르면 시군구 선택 select 나오게 하기
document.addEventListener('DOMContentLoaded', function () {
    // waselect1 요소 선택
    var waselect1 = document.querySelector('.waselect1');
    // waselect2 요소 선택
    var waselect2 = document.querySelector('.waselect2');

    // waselect1의 변경 이벤트 감지
    waselect1.addEventListener('change', function () {
        // 현재 선택된 지역
        var selectedRegion = waselect1.value;

        // waselect2 요소 초기화
        waselect2.innerHTML = '';

        if (selectedRegion !== '지역 선택') {
            waselect2.style.display = 'block';
        } else {
            // '지역 선택'인 경우 숨깁니다.
            waselect2.style.display = 'none';
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
// 2. 선택한 항목 결과 나오게 하기
document.addEventListener('DOMContentLoaded', function () {
    // 필요한 요소들을 가져옵니다.
    var waselect1 = document.querySelector('.waselect1');
    var waselect2 = document.querySelector('.waselect2');
    var career = document.querySelectorAll('.careerselect input[type="radio"]');
    var recselect = document.querySelector('.recselect');
    var selectedResult = document.querySelector('.selectedresult');

    // 각 select 요소와 체크박스의 change 이벤트를 감지하고, 선택된 항목을 표시합니다.
    waselect1.addEventListener('change', updateSelected);
    waselect2.addEventListener('change', updateSelected);
    recselect.addEventListener('change', updateSelected);
    career.forEach(function (radio) {
        radio.addEventListener('change', updateSelected);
    });

    // 선택된 항목을 업데이트하는 함수
    function updateSelected() {
        // 선택된 값들을 모두 가져옵니다.
        var selectedValues = [];

        if (waselect1.value !== '지역 선택') {
            selectedValues.push(waselect1.value);
        }
        if (waselect2.value !== '시/군/구 선택') {
            selectedValues.push(waselect2.value);
        }
        if (recselect.value !== '직종분류') {
            selectedValues.push(recselect.value);
        }
        career.forEach(function (radio) {
            if (radio.checked) {
                selectedValues.push(radio.nextSibling.textContent.trim());
            }
        });

        // selectedresult를 비웁니다.
        selectedResult.innerHTML = '';

        // 선택된 값들을 selectedresult에 추가합니다.
        selectedValues.forEach(function (value) {
            var selectedOption = document.createElement('div');
            selectedOption.textContent = value;
            selectedResult.appendChild(selectedOption);
        });
    }
});
// 3.새로고침 버튼
document.addEventListener('DOMContentLoaded', function () {
    // 새로고침 버튼 요소를 가져옵니다.
    var refreshButton = document.querySelector('.resetbtn');
    // var refreshButton2 = document.querySelector('.employtitle');

    // 버튼을 클릭할 때 페이지를 새로고침합니다.
    refreshButton.addEventListener('click', function () {
        // location.reload();
        location.href = location.pathname;
    });

    // refreshButton2.addEventListener('click', function () {
    //     location.reload();
    // });
});

const tbody = document.querySelector('tbody');
(async function () {
    try {
        // URL의 쿼리 문자열 파싱
        const urlParams = new URLSearchParams(window.location.search);

        // city-name, job 값 가져오기
        const cityName = urlParams.get('city-name');
        const job = urlParams.get('job');

        // 만약 쿼리 문자열에 city-name과 job이 모두 있으면 함수를 빠져나감
        if (cityName && job) {
            return;
        }

        const res = await axios({
            method: 'GET',
            url: '/api/employ/board/all',

            // headers: {
            //     //로그인해야 접근
            //     Authorization: `Bearer ${localStorage.getItem('token')}`,
            // },
        });
        // console.log(res.data.startPage, res.data.lastPage, res.data.currentPage);

        console.log('res', res);

        for (let i = 0; i < res.data.result.length; i++) {
            const html = `
            <tr>
                <td>${res.data.result[i].city_name.substring(0, 2)} ${res.data.result[i].town_name.substring(0, 2)}</td>
                <td>${res.data.result[i].job}</td>
                <td class = "title-td" ><a href="/employ/board/${res.data.result[i].id}" class="title-link">${
                res.data.result[i].title
            }</a></td>
                <td>${res.data.result[i].place_name}</td>
                <td>${res.data.result[i].career}</td>
                <td>${res.data.result[i].createdAt.substring(5, 10)}</td>
            </tr>
        `;
            tbody.insertAdjacentHTML('beforeend', html);
        }
    } catch (error) {
        console.log(error);
        //document.location.href = '/login';
    }
    // <td><a href="/employ/${res.data.result[i].employ_id}">${res.data.result[i].title}</a></td>
})();

//검색하기 함수

// 페이지 번호 변수 추가
// let currentPage = 1;
async function searchEmploy() {
    const res = await axios({
        method: 'GET',
        url: '/api/employ/board/search',
        params: {
            // page,
            city_name: document.querySelector('.waselect1').value,
            town_name: document.querySelector('.waselect2').value,
            career: document.querySelector('input[name="radiocareer"]:checked').value,
            job: document.querySelector('.recselect').value,
        },
    });
    console.log('res', res);
    const { success, result } = res.data;
    console.log(res.data);
    if (success) {
        //기존내용 삭제
        tbody.innerHTML = '';

        if (result.length === 0) {
            // 검색 결과가 없을 때 알림 표시
            alert('검색 결과가 없습니다.');
            return;
        }

        // 검색 결과를 추가합니다.
        for (let i = 0; i < result.length; i++) {
            const html = `
            <tr>
                <td>${result[i].city_name.substring(0, 2)} ${result[i].town_name.substring(0, 2)}</td>
                <td>${result[i].job}</td>
                <td class = "title-td" ><a href="/employ/board/${result[i].id}" class="title-link">${
                result[i].title
            }</a></td>
                <td>${result[i].place_name}</td>
                <td>${result[i].career}</td>
                <td>${result[i].createdAt.substring(5, 10)}</td>
            </tr>
            `;
            tbody.insertAdjacentHTML('beforeend', html);
        }
    }
}

async function searchMainEmploy(city_name, job) {
    const res = await axios({
        method: 'GET',
        url: '/api/employ/board/search',
        params: {
            city_name: city_name,
            job: job,
        },
    });

    const { success, result } = res.data;
    if (success) {
        // 기존내용 삭제
        tbody.innerHTML = '';

        if (result.length === 0) {
            // 검색 결과가 없을 때 알림 표시
            alert('검색 결과가 없습니다.');
            return;
        }
        // 검색 결과를 추가합니다.
        for (let i = 0; i < result.length; i++) {
            const html = `
                <tr>
                    <td>${result[i].city_name.substring(0, 2)} ${result[i].town_name.substring(0, 2)}</td>
                    <td>${result[i].job}</td>
                    <td class = "title-td" ><a href="/employ/board/${result[i].id}" class="title-link">${
                result[i].title
            }</a></td>
                    <td>${result[i].place_name}</td>
                    <td>${result[i].career}</td>
                    <td>${result[i].createdAt.substring(5, 10)}</td>
                </tr>
                `;
            tbody.insertAdjacentHTML('beforeend', html);
        }
    }
}
window.onload = async function () {
    // 첫 번째 기능: 로컬 스토리지에서 사용자 정보 가져오기 및 UI 업데이트
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user_name');
    if (token) {
        document.querySelector(
            '.headbtn'
        ).innerHTML = `<span><a href="/resume/mypage" class="mypage">${userName}</a>님 환영합니다💛</span>
        &nbsp;&nbsp;<button type="button" onclick="logout()" class="logout">로그아웃</button>`;
    } else {
        document.querySelector('.headbtn').innerHTML = `<a href="/user/login" class="login">로그인</a>
             <a href="/user/signup" class="sign">회원가입</a>
             `;
    }

    // 두 번째 기능: URL의 쿼리 문자열 파싱 및 페이지에 반영
    const urlParams = new URLSearchParams(window.location.search);
    const city_name = urlParams.get('city-name');
    const job = urlParams.get('job');

    // 가져온 값으로 select box 설정
    if (city_name) {
        document.querySelector('.waselect1').value = city_name;
    }
    if (job) {
        document.querySelector('.recselect').value = job;
    }

    // 선택된 결과를 selectedresult에 표시
    if (city_name || job) {
        document.querySelector('.selectedresult').innerText = ` ${city_name}, ${job}`;
    }

    // 쿼리값에 따라 검색 결과 출력
    await searchMainEmploy(city_name, job);
    console.log(await searchMainEmploy(city_name, job));
};

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    alert('로그아웃 되었습니다.');
    window.location.href = '/';

    // window.location.reload(); // 페이지를 새로고침하여 로그인 상태를 업데이트
}
