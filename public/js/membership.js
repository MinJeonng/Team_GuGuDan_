document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const nickname = document.getElementById('nickname').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const email = document.getElementById('email').value;
        const verificationCode = document.getElementById('verification-code').value;
        const address = document.getElementById('address').value;
        const detailAddress = document.getElementById('detail-address').value;
        const phone = document.getElementById('phone').value;
        const website = document.getElementById('website').value;

        console.log('가입 정보:', {
            name,
            nickname,
            username,
            password,
            confirmPassword,
            email,
            verificationCode,
            address,
            detailAddress,
            phone,
            website,
        });

        alert('회원가입이 완료되었습니다!');
    });
});
