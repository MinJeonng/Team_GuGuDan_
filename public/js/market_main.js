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

// //검색하기 함수  (프론트가 없어서 우선 주석 처리)

// // 페이지 번호 변수 추가
// // let currentPage = 1;
// async function searchEmploy() {
//     const res = await axios({
//         method: 'GET',
//         url: '/api/employ/board/search',
//         params: {
//             // page,
//             city_name: document.querySelector('.waselect1').value,
//             town_name: document.querySelector('.waselect2').value,
//             career: document.querySelector('input[name="radiocareer"]:checked').value,
//             job: document.querySelector('.recselect').value,
//         },
//     });
//     console.log('res', res);
//     const { success, result } = res.data;
//     console.log(res.data);
//     if (success) {
//         //기존내용 삭제
//         tbody.innerHTML = '';

//         // 검색 결과를 추가합니다.
//         for (let i = 0; i < result.length; i++) {
//             const html = `
//             <tr>
//                 <td>${result[i].city_name.substring(0, 2)} ${result[i].town_name.substring(0, 2)}</td>
//                 <td>${result[i].job}</td>
//                 <td class = "title-td" ><a href="/employ/board/${result[i].id}" class="title-link">${
//                 result[i].title
//             }</a></td>
//                 <td>${result[i].place_name}</td>
//                 <td>${result[i].career}</td>
//                 <td>${result[i].createdAt.substring(5, 10)}</td>
//             </tr>
//             `;
//             tbody.insertAdjacentHTML('beforeend', html);
//         }
//     }
// }
// window.onload = async function () {
//     // URL의 쿼리 문자열 파싱
//     const urlParams = new URLSearchParams(window.location.search);

//     // city_name, job 값 가져오기
//     const city_name = urlParams.get('city-name');
//     const job = urlParams.get('job');

//     // 가져온 값으로 select box 설정
//     if (city_name) {
//         document.querySelector('.waselect1').value = city_name;
//     }
//     if (job) {
//         document.querySelector('.recselect').value = job;
//     }

//     // 선택된 결과를 selectedresult에 표시
//     if (city_name || job) {
//         document.querySelector('.selectedresult').innerText = ` ${city_name}, ${job}`;
//     }

//     // 쿼리값에 따라 검색 결과 출력
//     await searchMainEmploy(city_name, job);
// };

// async function searchMainEmploy(city_name, job) {
//     const res = await axios({
//         method: 'GET',
//         url: '/api/employ/board/search',
//         params: {
//             city_name: city_name,
//             job: job,
//         },
//     });

//     const { success, result } = res.data;
//     if (success) {
//         // 기존내용 삭제
//         tbody.innerHTML = '';

//         // 검색 결과를 추가합니다.
//         for (let i = 0; i < result.length; i++) {
//             const html = `
//             <tr>
//                 <td>${result[i].city_name.substring(0, 2)} ${result[i].town_name.substring(0, 2)}</td>
//                 <td>${result[i].job}</td>
//                 <td class = "title-td" ><a href="/employ/board/${result[i].id}" class="title-link">${
//                 result[i].title
//             }</a></td>
//                 <td>${result[i].place_name}</td>
//                 <td>${result[i].career}</td>
//                 <td>${result[i].createdAt.substring(5, 10)}</td>
//             </tr>
//             `;
//             tbody.insertAdjacentHTML('beforeend', html);
//         }
//     }
// }
