const { DataTypes } = require('sequelize');
// const { sequelize } = require('.');

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
            //시설명
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        city_name: {
            //지역선택
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        town_name: {
            //시/군/구 선택
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        place_address: {
            //상세주소
            type: DataTypes.STRING(30),
            // allowNull : true,
        },
        phoneNum: {
            //전화번호
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        homepage: {
            type: DataTypes.STRING(40),
        },
        job: {
            //구인직종
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        education: {
            //학력정도
            type: DataTypes.STRING,
            allowNull: false,
        },
        career: {
            //경력
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        salary: DataTypes.INTEGER,
        deadline: DataTypes.DATE,
        content: {
            //세부내용
            type: DataTypes.TEXT('medium'),
        },
    });
};

module.exports = ContentModel;
