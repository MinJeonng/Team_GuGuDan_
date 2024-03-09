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
    const { place_name, city_name, town_name, phoneNum, job, career, salary, education, deadline, content } =
        res.data.result;
    const address = `${city_name} ${town_name}`;
    document.querySelector('#place_name').innerText = place_name;
    document.querySelector('#address').innerText = address;
    document.querySelector('#phoneNum').innerText = phoneNum;
    document.querySelector('#job').innerText = job;
    document.querySelector('#career').innerText = career;
    document.querySelector('#salary').innerText = salary;
    document.querySelector('#education').innerText = education;
    document.querySelector('#deadline').innerText = deadline.substring(0, 10);
    document.querySelector('#content').innerText = content;
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
    window.location.href = '/';

    // window.location.reload(); // 페이지를 새로고침하여 로그인 상태를 업데이트
}
