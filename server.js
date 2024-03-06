const express = require('express');
const app = express();
const PORT = 8000;
const path = require('path');

app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function (req, res) {

    res.render('employ_main');
});

app.get('/market', (req, res) => {
    res.render('market');

});
app.get('/employ/employ-writing', (req, res) => {
    res.render('employ/employ-writing');
});
app.get('/market/market-writing', (req, res) => {
    res.render('market/market-writing');
});
app.get('/community/community', (req, res) => {
    res.render('community/community');
});
app.get('/community/community-writing', (req, res) => {
    res.render('community/community-writing');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
