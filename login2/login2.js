document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // 여기서는 단순히 콘솔에 출력하도록 함
    console.log('Username: ' + username);
    console.log('Password: ' + password);
});
