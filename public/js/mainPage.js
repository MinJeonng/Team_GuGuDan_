$('a').click(function (event) {
    event.preventDefault();
});
// 메인슬라이드
$(document).ready(function () {
    let currentIndex = 0;
    let imageSlides = $('.main-slide');
    let slideCount = imageSlides.length;

    imageSlides.eq(0).addClass('active');

    function slideShow() {
        imageSlides.eq(currentIndex).removeClass('active');
        currentIndex = (currentIndex + 1) % slideCount;
        imageSlides.eq(currentIndex).addClass('active');
    }
    setInterval(slideShow, 3000); // 3000 = 3초마다 슬라이드가 변경
});

async function searchMainEmploy() {
    const city_name = document.querySelector('.waselect1').value;
    const job = document.querySelector('.waselect2').value;

    document.location.href = `/employ/board?city-name=${city_name}&job=${job}`;
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
