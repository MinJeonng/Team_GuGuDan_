const [_, url] = document.location.href.split('board/');
console.log(url);
//const ul = document.querySelector('ul');
(async function () {
    const res = await axios({
        method: 'GET',
        url: `/api/community/${url}`,

        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    console.log(res);
    const { com_division, com_title, community_id, com_mail, createdAt, com_content } = res.data.result; //com_content
    const newText = `[${com_division}]`;
    document.querySelector('#group').innerText = newText;
    document.querySelector('#title').innerText = com_title;
    document.querySelector('#id').innerText = community_id;
    document.querySelector('#email').innerText = com_mail;
    document.querySelector('#date').innerText = createdAt.substring(0, 10);
    document.querySelector('#content').innerText = com_content;

    //document.querySelector('#password').value = password;
    console.log(res.data.result);

    // 인풋 요소 편집 막기.
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => input.setAttribute('readonly', true));
})();
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
