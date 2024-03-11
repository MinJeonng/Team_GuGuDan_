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
        document.location.href = '/';
    }
})();
const secondTbody = document.querySelector('#second');
(async function () {
    try {
        const secondTbody = document.querySelector('#second');
        const res = await axios({
            method: 'get',
            url: '/api/resume/all',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(res);
        // const currentUserId = localStorage.getItem('userId');
        // console.log(currentUserId);
        for (let i = 0; i < res.data.result.length; i++) {
            const html = `<td class="maincontentBox">
                                <div class="resumelogo">이력서</div>
                                <div class="maincontent">
                                    <div class="resumeTitle">${res.data.result[i].resume_title}</div>
                                    <div>
                                        <span>내 이력서 상태: <span style="color: blue">이직희망(재직중)</span></span>
                                    </div>
                                    <div class="resumedateBox">
                                        등록일 : <span class="regDate">${res.data.result[i].createdAt.substring(
                                            0,
                                            10
                                        )}</span>&nbsp;|&nbsp;수정일 :
                                        <span class="repDate">${res.data.result[i].updatedAt.substring(0, 10)}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="btnBox">
                            <dib><button type="button" onclick="window.location.href='/resume/register/${
                                res.data.result[i].id
                            }'">보기</button><button type="button" >수정</button></div>
                                <div><button type="button">복사</button><button type="button">삭제</button></div>
                            </td>
                            <td class="interview">
                                <div>면접 요청 기관</div>
                                <div><span class="reqcount">0</span>개</div>
                            </td>`;
            secondTbody.insertAdjacentHTML('beforeend', html);
        }
    } catch (error) {
        console.log(error);
    }
})();
