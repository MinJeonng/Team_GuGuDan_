'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);
// 모델
db.Content = require('./content')(sequelize);
db.User = require('./user')(sequelize);
db.Resume = require('./resume')(sequelize);
db.ChatMessage = require('./chatmessage')(sequelize);

db.User.hasMany(db.Content, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Content.belongsTo(db.User, { foreignKey: 'userId', onDelete: 'CASCADE' });

db.User.hasMany(db.ChatMessage, { foreignKey: 'chatId', onDelete: 'CASCADE' });
db.ChatMessage.belongsTo(db.User, { foreignKey: 'chatId', onDelete: 'CASCADE' });

db.User.hasMany(db.Resume, { foreignKey: 'resumeId', onDelete: 'CASCADE' });
db.Resume.belongsTo(db.User, { foreignKey: 'resumeId', onDelete: 'CASCADE' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;