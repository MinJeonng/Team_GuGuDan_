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
            <td>${res.data.result[i].seller_id}</td> 
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
