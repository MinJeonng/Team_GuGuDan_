const { DataTypes } = require('sequelize');

const CommunityModel = (sequelize) => {
    return sequelize.define('community', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        community_id: { type: DataTypes.STRING(20), allowNull: false },
        com_mail: { type: DataTypes.STRING(20), allowNull: false },
        com_division: { type: DataTypes.STRING(20), allowNull: false },
        com_title: { type: DataTypes.STRING(20), allowNull: false },

        con_content: { type: DataTypes.STRING(150), allowNull: false },
        // con_file
    });
};

module.exports = CommunityModel;
