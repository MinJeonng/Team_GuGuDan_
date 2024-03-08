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

//수정
// async function updateFunc() {
//     //const form = document.forms['post-form'];
//     try {
//         const res = await axios({
//             method: 'PATCH',
//             url: `/api/employ/board/${url}/update`,
//             data: {
//                 city_name: document.querySelector('#city_name').value,
//                 town_name: document.querySelector('#town_name').value,
//                 place_address: document.querySelector('#place_address').value,
//                 deadline: document.querySelector('#deadline').value,
//                 homepage: document.querySelector('#homepage').value,
//                 job: document.querySelector('#job').value,
//                 title: document.querySelector('#title').value,
//                 place_name: document.querySelector('#place_name').value,
//                 career: document.querySelector('#career').value,
//                 // password: document.querySelector('#password').value,
//                 salary: document.querySelector('#salary').value,
//             },
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//         });
//         console.log('res', res);

//         if (res.data.success) {
//             //document.location.reload();
//             // '수정' 버튼 숨기기
//             document.querySelector('button[onclick="updateFunc()"]').style.display = 'none';
//             // '확인' 버튼 보이기
//             document.querySelector('button[onclick="confirmFunc()"]').style.display = 'inline-block'; // 또는 'block';
//             // '삭제' 버튼 숨기기
//             document.querySelector('button[onclick="deleteFunc()"]').style.display = 'none';
//             const inputs = document.querySelectorAll('input');
//             inputs.forEach((input) => input.removeAttribute('readonly'));
//         }
//     } catch (err) {
//         alert('작성자가 아니어서 수정이 불가합니다.');
//         console.log(err);
//     }
// }
//확인
// async function confirmFunc() {
//     try {
//         const res = await axios({
//             method: 'PATCH',
//             url: `/api/employ/board/${url}/update`,
//             data: {
//                 city_name: document.querySelector('#city_name').value,
//                 town_name: document.querySelector('#town_name').value,
//                 place_address: document.querySelector('#place_address').value,
//                 deadline: document.querySelector('#deadline').value,
//                 homepage: document.querySelector('#homepage').value,
//                 job: document.querySelector('#job').value,
//                 title: document.querySelector('#title').value,
//                 place_name: document.querySelector('#place_name').value,
//                 career: document.querySelector('#career').value,
//                 // password: document.querySelector('#password').value,
//                 salary: document.querySelector('#salary').value,
//             },
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//         });

//         if (res.data.success) {
//             alert('수정이 완료되었습니다.');

//             // 페이지 새로고침
//             document.location.reload();
//         } else {
//             alert('수정이 실패하였습니다. 다시 시도해 주세요.');
//         }
//     } catch (err) {
//         alert('오류가 발생했습니다. 다시 시도해 주세요.');
//         console.log(err);
//     }
// }

//삭제
// async function deleteFunc() {
//     try {
//         const res = await axios({
//             method: 'DELETE',
//             url: `/api/employ/board/${url}/delete`,
//             data: {
//                 id: document.querySelector('#index').value,
//             },

//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//         });
//         if (res.data.success) {
//             if (!confirm('삭제하시겠습니까?')) {
//                 return;
//             }
//             document.location.href = '/employ/board';
//         }
//     } catch (err) {
//         alert('작성자가 아니어서 수정이 불가합니다.');
//         console.log(err);
//     }
// }
