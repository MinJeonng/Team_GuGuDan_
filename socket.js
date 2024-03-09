const socketIo = require('socket.io');
const { ChatMessage } = require('./models');

module.exports = (server) => {
    const io = socketIo(server);

    // 소켓
    io.on('connection', (socket) => {
        // 채팅방 입장
        socket.on('enter', (res) => {
            const { roomId } = res;
            socket.join(roomId);
            socket.roomId = roomId;
        });
        // 채팅 입력
        socket.on('msg', (res) => {
            const { chatMsg, userId, userNick } = res;
            io.to(socket.roomId).emit('newMsg', {
                chatMsg,
                userId,
                userNick,
                roomId: socket.roomId,
            });
        });
    });
};
