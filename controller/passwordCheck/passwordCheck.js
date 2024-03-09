document.getElementById('passwordForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var usernameInput = document.getElementById('username').value;
    var passwordInput = document.getElementById('password').value;
    if (passwordInput === '1234') {
        document.getElementById('message').innerText = '비밀번호가 확인되었습니다.';
    } else {
        document.getElementById('message').innerText = '비밀번호가 올바르지 않습니다. 다시 시도해주세요.';
    }
});
