const [_, url] = document.location.href.split('board/');
console.log(url);
//const ul = document.querySelector('ul');
(async function () {
    const res = await axios({
        method: 'GET',
        url: `/api/market/${url}`,

        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    console.log(res);
    const { location_city, pd_mail, category, pd_title, seller_id, pd_status, seller_ph, pd_price, pd_content } =
        res.data.result;
    document.querySelector('#saleadress').innerText = location_city;
    document.querySelector('#saleemail').innerText = pd_mail;
    document.querySelector('#salepage').innerText = category;
    document.querySelector('.saletitle').innerText = pd_title;
    document.querySelector('#regist').innerText = seller_id;
    document.querySelector('#salestate').innerText = pd_status;
    document.querySelector('#phonenum').innerText = seller_ph;
    document.querySelector('#saleprice').innerText = pd_price;
    document.querySelector('#salecontent').innerText = pd_content;

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
        window.location.href = `/market/board/${previousPage}`;
    } else {
        alert('페이지가 존재하지 않습니다.');
    }
}
function nextPage() {
    const [_, url] = document.location.href.split('board/');
    const currentPage = parseInt(url);
    const nextPage = currentPage + 1;
    window.location.href = `/market/board/${nextPage}`;
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
// (function () {
//     if (localStorage.getItem('token') === null) {
//         alert('로그인 후 이용가능합니다.');
//         document.location.href = '/employ/board';
//     }
// })();
