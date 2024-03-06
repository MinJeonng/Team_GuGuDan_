// const express = require('express');
// const app = express();
// const PORT = 8000;
// const path = require('path');

// app.use('/public', express.static(__dirname + '/public'));

// app.set('view engine', 'ejs');
// app.set('views', './views');

// app.get('/', function (req, res) {
//     res.render('employ');
// });

<<<<<<< HEAD
// app.get('/market', (req, res) => {
//     res.render('market');
// });
// app.get('/employ-writing', (req, res) => {
//     res.render('employ-writing');
// });
// app.get('/market-writing', (req, res) => {
//     res.render('market-writing');
// });
=======
app.get('/market', (req, res) => {
    res.render('market');
});
app.get('/employ-writing', (req, res) => {
    res.render('employ-writing');
});
app.get('/market-writing', (req, res) => {
    res.render('market-writing');
});
app.get('/community', (req, res) => {
    res.render('community');
});
app.get('/community-writing', (req, res) => {
    res.render('community-writing');
});
>>>>>>> devel

// app.listen(PORT, () => {
//     console.log(`http://localhost:${PORT}`);
// });
