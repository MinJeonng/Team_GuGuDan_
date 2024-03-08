exports.main = (req, res) => {
    res.render('mainPage'); //가장 첫 번째 메인 페이지
};
exports.intro = (req, res) => {
    res.render('intro'); //인트로 화면
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
    res.render('employ/employ_main'); //이게 board의 메인화면
};
exports.board_write = (req, res) => {
    res.render('employ/employ_writing');
};
exports.board_detail = (req, res) => {
    res.render('employ/board_detail');
};

exports.market_main = (req, res) => {
    res.render('market/market');
};

exports.market_detail = (req, res) => {
    res.render('market/market-detail');
};

exports.market_write = (req, res) => {
    res.render('market/market-writing');
};

exports.community_main = (req, res) => {
    res.render('community/community');
};

exports.community_detail = (req, res) => {
    res.render('community/community-detail');
};
exports.community_write = (req, res) => {
    res.render('community/community-writing');
};

exports.mypage = (req, res) => {
    res.render('resume/resume-mypage');
};

exports.resume_register = (req, res) => {
    res.render('resume/resume'); //이력서 등록페이지
};
