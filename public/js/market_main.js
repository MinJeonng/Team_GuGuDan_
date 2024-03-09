$(document).ready(function () {
    $('.wrtable tbody td:nth-child(4)').click(function () {
        // 여기에 클릭했을 때 실행할 함수를 작성합니다.
        var width = 400; // 팝업 창의 너비
        var height = 400; // 팝업 창의 높이
        var left = (window.innerWidth - width) / 2; // 화면 가운데 정렬을 위한 left 값
        var top = (window.innerHeight - height) / 2; // 화면 가운데 정렬을 위한 top 값

        var calculatorWindow = window.open(
            '../../public/marketpopup.html',
            '_blank',
            'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top
        );

        // 팝업 창이 차단되었는지 확인
        if (!calculatorWindow) {
            alert('팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도하세요.');
        }
    });
});
const tbody = document.querySelector('tbody');
(async function () {
    try {
        // URL의 쿼리 문자열 파싱
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
            url: '/api/market/all',

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
                <td>${res.data.result[i].location_city.substring(0, 2)} ${res.data.result[i].location_town.substring(
                0,
                2
            )}</td>
                <td>${res.data.result[i].pd_division}</td>
                <td class = "title-td" ><a href="/market/board/${res.data.result[i].id}" class="title-link">${
                res.data.result[i].category
            }</a></td>
                <td>${res.data.result[i].pd_title}</td>
                <td>${res.data.result[i].seller_id}</td>
                <td>${res.data.result[i].pd_status}</td>
                <td>${res.data.result[i].createdAt.substring(5, 10)}</td>
            </tr>
        `;
            tbody.insertAdjacentHTML('beforeend', html);
        }
        // // 페이지네이션 만들기
        // const { startPage, lastPage, currentPage } = res.data;
        // const paginationArea = document.querySelector('nav[aria-label="board page navigation"] ul');

        // // 이전 페이지
        // const prevPage = startPage - 1;
        // if (startPage > 1) {
        //     paginationArea.insertAdjacentHTML(
        //         'beforeend',
        //         `<li class="page-item"><a class="page-link" href="/employ/board/${prevPage}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
        //     );
        // }

        // // 페이지 번호
        // for (let i = startPage; i <= lastPage; i++) {
        //     if (i === currentPage) {
        //         paginationArea.insertAdjacentHTML(
        //             'beforeend',
        //             `<li class="page-item active"><a class="page-link" href="/employ/board/${i}"><b>${i}</b></a></li>`
        //         );
        //     } else {
        //         paginationArea.insertAdjacentHTML(
        //             'beforeend',
        //             `<li class="page-item"><a class="page-link" href="/employ/board/${i}">${i}</a></li>`
        //         );
        //     }
        // }

        // // 다음 페이지
        // const nextPage = startPage + 10;
        // if (nextPage <= lastPage) {
        //     paginationArea.insertAdjacentHTML(
        //         'beforeend',
        //         `<li class="page-item"><a class="page-link" href="/employ/board/${nextPage}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`
        //     );
        // }
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
