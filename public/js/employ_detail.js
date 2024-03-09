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
