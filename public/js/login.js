async function loginFunc() {
    const res = await axios({
        method: 'POST',
        url: '/api/user/login',
        data: {
            user_id: document.querySelector('#user_id').value,
            user_pw: document.querySelector('#user_pw').value,
            user_name: document.querySelector('#user_name').value,
        },
    });
    console.log(res);
    if (res.data.success) {
        alert('환영합니다!');
        //localStorage: 브라우저에 정보를 저장, 브라우저닫혀도 계속유지
        //sessionStroage: 브라우저 정보를 저장. 단, 브라우저가 닫히면 정보삭제
        localStorage.setItem('token', res.data.token); //프론트에서 저장해두겠다.
        localStorage.setItem('user_name', res.data.user_name);
        document.location.href = '/';
        // 수정해야함 페이지 이동.
    } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        document.querySelector('#user_id').value = '';
        document.querySelector('#user_pw').value = '';
    }
}
