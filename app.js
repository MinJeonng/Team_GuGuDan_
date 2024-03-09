require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8000;
const db = require('./models');

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());

//웹소켓.
const http = require('http');
const websocket = require('./socket');
const server = http.createServer(app);
websocket(server);

const pageRouter = require('./routes/page');
app.use('/', pageRouter);
const employRouter = require('./routes/employ_board');
app.use('/api/employ/board', employRouter);
const resumeRouter = require('./routes/resume');
app.use('/api/resume', resumeRouter);
const marketRouter = require('./routes/market');
app.use('/api/market', marketRouter);
const communityRouter = require('./routes/community');
app.use('/api/community', communityRouter);
const userRouter = require('./routes/user');
app.use('/api/user', userRouter);

//404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

//테이블 생성
db.sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log(`http://localhost:${PORT}/intro`);
    });
});
