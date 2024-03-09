const { DataTypes } = require('sequelize');

const ChatMessageModel = (sequelize) => {
    return sequelize.define('chatmessage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        message: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        user_id: {
            //채팅방 부여 id. 필요한가?
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};

module.exports = ChatMessageModel;

// // 채팅 조회
// exports.findChat = async (req, res) => {
//     const { groupId } = req.query;
//     const result = await Chat.findAll({ where: { groupId } });
//     res.json({ success: true, result, message: '채팅 목록 조회 완료' });
// };
