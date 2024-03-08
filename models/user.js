const { DataTypes } = require('sequelize');

const UserModel = (sequelize) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.STRING(31),
            allowNull: false,
        },
        user_pw: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_phoneNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_website: {
            type: DataTypes.STRING,
        },

        // user_age: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // user_gender: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        user_nick: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_personal: {
            //boolean 값으로????
            type: DataTypes.STRING,
            allowNull: false,
            // defaultValue: 0, // 기본값을 0 (개인)으로 설정
            // validate: {
            //     isIn: [[0, 1]], // 값이 0 또는 1만 가능하도록 검증
            // },
        },
        user_postCode: {
            //우편번호
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_roadAddress: {
            //도로명주소
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_detailAddress: {
            //상세주소
            type: DataTypes.STRING,
        },
    });
};

module.exports = UserModel;
