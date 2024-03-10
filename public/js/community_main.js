const tbody = document.querySelector('tbody');
(async function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);

        // city-name, job 값 가져오기
        const cityName = urlParams.get('location_city');
        const job = urlParams.get('pd_division');

        // 만약 쿼리 문자열에 city-name과 job이 모두 있으면 함수를 빠져나감
        if (cityName && job) {
            return;
        }

        const res = await axios({
            method: 'GET',
            url: '/api/community/all',

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
                <td>${res.data.result[i].id}</td>
                <td>${res.data.result[i].com_division}</td>
                <td class = "title-td" ><a href="/community/board/${res.data.result[i].id}" class="title-link">${
                res.data.result[i].com_title
            }</a></td>
            
                <td>${res.data.result[i].community_id}</td>
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
