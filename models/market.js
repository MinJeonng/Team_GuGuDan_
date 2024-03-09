const { DataTypes } = require('sequelize');

const MarketModel = (sequelize) => {
    return sequelize.define('market', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        seller_id: { type: DataTypes.STRING(20), allowNull: false },
        seller_ph: { type: DataTypes.STRING(20), allowNull: false },
        pd_status: { type: DataTypes.STRING(20), allowNull: false },
        category: { type: DataTypes.STRING(20), allowNull: false },
        pd_title: { type: DataTypes.STRING(20), allowNull: false },
        pd_division: { type: DataTypes.STRING(20), allowNull: false },
        pd_price: { type: DataTypes.INTEGER, allowNull: false },
        pd_mail: { type: DataTypes.STRING(20), allowNull: false },
        location_city: { type: DataTypes.STRING(20), allowNull: false },
        location_town: { type: DataTypes.STRING(20), allowNull: false },
        location_detail: { type: DataTypes.STRING(20), allowNull: false },
        pd_content: { type: DataTypes.STRING(150), allowNull: false },
        // pd_picture
    });
};

module.exports = MarketModel;
