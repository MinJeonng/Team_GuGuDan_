exports.main = (req, res) => {
    res.render('main'); //가장 첫 번째 메인 페이지
};
exports.member = (req, res) => {
    res.render('user/index');
};
exports.login = (req, res) => {
    res.render('user/login');
};
exports.signup = (req, res) => {
    res.render('user/signup');
};
exports.info = (req, res) => {
    res.render('user/profile');
};
exports.board_main = (req, res) => {
    res.render('employ/board_main'); //이게 board의 메인화면
};
exports.board_write = (req, res) => {
    res.render('employ/board_write');
};
exports.board_detail = (req, res) => {
    res.render('employ/board_detail');
};

exports.resume_register = (req, res) => {
    res.render('resume/register'); //이력서 등록페이지
};
