const [_, url] = document.location.href.split('board/');
console.log(url);
//const ul = document.querySelector('ul');
(async function () {
    const res = await axios({
        method: 'GET',
        url: `/api/employ/board/${url}`,

        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    console.log(res);
    const { title, place_name, city_name, town_name, phoneNum, job, career, salary, education, deadline } =
        res.data.result;
    console.log(res.data.result);
    const address = `${city_name} ${town_name}`;
    document.querySelector('#title').innerText = title;
    document.querySelector('#place_name').innerText = place_name;
    document.querySelector('#address').innerText = address;
    document.querySelector('#phoneNum').innerText = phoneNum;
    document.querySelector('#job').innerText = job;
    document.querySelector('#career').innerText = career;
    document.querySelector('#salary').innerText = salary;
    document.querySelector('#education').innerText = education;
    document.querySelector('#deadline').innerText = deadline.substring(0, 10);
    // document.querySelector('#content').innerText = content;
    // document.querySelector('#').innerText = file; // 첨부파일 넣을곳 우선 주석

    //document.querySelector('#password').value = password;
    console.log(res.data.result);

    // 인풋 요소 편집 막기.
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => input.setAttribute('readonly', true));
})();
function backPage() {
    const [_, url] = document.location.href.split('board/'); // url은 문자열로 추출된다.
    const currentPage = parseInt(url); // 현재 페이지 번호 추출
    if (!isNaN(currentPage) && currentPage > 1) {
        // 현재 페이지가 숫자이고 1보다 큰지 확인
        const previousPage = currentPage - 1;
        window.location.href = `/employ/board/${previousPage}`;
    } else {
        alert('페이지가 존재하지 않습니다.');
    }
}
function nextPage() {
    const [_, url] = document.location.href.split('board/');
    const currentPage = parseInt(url);
    const nextPage = currentPage + 1;
    window.location.href = `/employ/board/${nextPage}`;
}
//모든 페이지에 추가!
window.onload = function () {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user_name');
    if (token) {
        document.querySelector(
            '.headbtn'
        ).innerHTML = `<span><a href="/resume/mypage" class="mypage">${userName}</a>님 환영합니다💛</span>
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
    window.location.href = '/';

    // window.location.reload(); // 페이지를 새로고침하여 로그인 상태를 업데이트
}
//토큰 없으면 들어가지 못하게 예외처리
(function () {
    if (localStorage.getItem('token') === null) {
        alert('로그인 후 이용가능합니다.');
        document.location.href = '/employ/board';
    }
})();
async function updateFunc() {
    const dataElements = [
        { id: 'title', currentValue: document.querySelector('#title').innerText },
        { id: 'place_name', currentValue: document.querySelector('#place_name').innerText },
        { id: 'address', currentValue: document.querySelector('#address').innerText },
        { id: 'phoneNum', currentValue: document.querySelector('#phoneNum').innerText },
        { id: 'job', currentValue: document.querySelector('#job').innerText },
        { id: 'career', currentValue: document.querySelector('#career').innerText },
        { id: 'salary', currentValue: document.querySelector('#salary').innerText },
        { id: 'education', currentValue: document.querySelector('#education').innerText },
        { id: 'deadline', currentValue: document.querySelector('#deadline').innerText },
        // { id: 'content', currentValue: document.querySelector('#content').innerText },
    ];

    // 객체로 변환
    const dataObject = dataElements.reduce((obj, item) => {
        obj[item.id] = item.currentValue;
        return obj;
    }, {});
    //const form = document.forms['post-form'];
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/employ/board/${url}/update`,
            data: {
                dataObject,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('res', res);

        if (res.data.success) {
            //document.location.reload();
            // '수정' 버튼 숨기기
            document.querySelector('button[onclick="updateFunc()"]').style.display = 'none';
            // '확인' 버튼 보이기
            document.querySelector('button[onclick="confirmFunc()"]').style.display = 'inline-block'; // 또는 'block';
            // '삭제' 버튼 숨기기
            document.querySelector('button[onclick="deleteFunc()"]').style.display = 'none';
            dataElements.forEach((item) => {
                const element = document.querySelector(`#${item.id}`);
                element.innerHTML = `<input type="text" id="${item.id}_input" value="${item.currentValue}">`;
            });
        }
    } catch (err) {
        alert('작성자가 아니어서 수정이 불가합니다.');
        console.log(err);
    }
}
async function confirmFunc() {
    const updatedDataElements = [
        { id: 'title', newValue: document.querySelector('#title_input').value },
        { id: 'place_name', newValue: document.querySelector('#place_name_input').value },
        { id: 'address', newValue: document.querySelector('#address_input').value },
        { id: 'phoneNum', newValue: document.querySelector('#phoneNum_input').value },
        { id: 'job', newValue: document.querySelector('#job_input').value },
        { id: 'career', newValue: document.querySelector('#career_input').value },
        { id: 'salary', newValue: document.querySelector('#salary_input').value },
        { id: 'education', newValue: document.querySelector('#education_input').value },
        { id: 'deadline', newValue: document.querySelector('#deadline_input').value },
        // { id: 'content', newValue: document.querySelector('#content').value },
    ];

    const updatedDataObject = updatedDataElements.reduce((obj, item) => {
        obj[item.id] = item.newValue;
        return obj;
    }, {});

    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/employ/board/${url}/update`,
            data: {
                updatedDataObject,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (res.data.success) {
            alert('수정이 완료되었습니다.');
            updatedDataElements.forEach((item) => {
                const element = document.querySelector(`#${item.id}`);
                element.innerHTML = item.newValue; // 입력 필드를 텍스트로 변경
            });
            // '수정' 버튼 보이기
            document.querySelector('button[onclick="updateFunc()"]').style.display = 'inline-block'; // 또는 'block';
            // '확인' 버튼 숨기기
            document.querySelector('button[onclick="confirmFunc()"]').style.display = 'none';
            // '삭제' 버튼 보이기
            document.querySelector('button[onclick="deleteFunc()"]').style.display = 'inline-block'; // 또는 'block';
            // // 페이지 새로고침
            // document.location.reload();
        } else {
            alert('수정이 실패하였습니다. 다시 시도해 주세요.');
        }
    } catch (err) {
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
        console.log(err);
    }
}

async function deleteFunc() {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/employ/board/${url}/delete`,
            data: {
                id: document.querySelector('#index').value,
            },

            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (res.data.success) {
            if (!confirm('삭제하시겠습니까?')) {
                return;
            }
            document.location.href = '/employ/board';
        }
    } catch (err) {
        alert('작성자가 아니어서 수정이 불가합니다.');
        console.log(err);
    }
}
