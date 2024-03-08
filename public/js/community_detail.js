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
    const { com_division, com_title, community_id, com_mail, createdAt, com_content } = res.data.result;
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
