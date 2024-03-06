const { DataTypes } = require('sequelize');
const { sequelize } = require('.');

const ContentModel = (sequelize) => {
    return sequelize.define('content', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        // employ_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     autoIncrement: true,
        // },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        place_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        city_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        town_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        place_address: {
            type: DataTypes.STRING(30),
            // allowNull : true,
        },
        homepage: {
            type: DataTypes.STRING(40),
        },
        job: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        career: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        salary: DataTypes.INTEGER,
        deadline: DataTypes.DATE,
        content: {
            type: DataTypes.TEXT('medium'),
        },
    });
};

module.exports = ContentModel;
