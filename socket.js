const socketIo = require('socket.io');
const { ChatMessage } = require('./models');

module.exports = (server) => {
    const io = socketIo(server);

    const roomList = [];

    // 사용자 정보 갱신 함수
    function getUserList(room) {
        const users = [];
        const clients = io.sockets.adapter.rooms.get(room);
        if (clients) {
            clients.forEach((client) => {
                const userSocket = io.sockets.sockets.get(client);
                const info = { userName: userSocket.userName, key: client };
                users.push(info);
            });
        }
        return users;
    }

    io.on('connection', (socket) => {
        socket.on('create', (res) => {
            socket.join(res.roomName);
            socket.roomName = res.roomName;
            socket.userName = res.userName;

            socket.to(res.roomName).emit('notice', `${socket.id}님이 입장하셨습니다`);

            if (!roomList.includes(res.roomName)) {
                roomList.push(res.roomName);
                io.emit('roomList', roomList);
            }

            const userList = getUserList(res.roomName);
            io.to(res.roomName).emit('userList', userList);
        });

        socket.on('sendMessage', (res) => {
            const { message, user, select } = res;
            if (select === 'all') {
                io.to(socket.roomName).emit('newMessage', { message, user, dm: false });
            } else {
                io.to(select).emit('newMessage', { message, user, dm: true });
                socket.emit('newMessage', { message, user, dm: true });
            }
        });
    });
};
