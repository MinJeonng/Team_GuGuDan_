const { DataTypes } = require('sequelize');

const ResumeModel = (sequelize) => {
    return sequelize.define('resume', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        home_num: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        phone_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        contact_method: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        edu: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        carrer: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        // 구직형태, 희망 시설, 직종, 급여, 구직지역(시,도) 희망지약(구)
        wish_form: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        wish_category: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        wish_occupation: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        wish_salary: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        wish_city: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        wish_town: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        resume_title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        resume_detail: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
    });
};

module.exports = ResumeModel;
