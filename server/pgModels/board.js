const sequelize = new Sequelize('board', 'username', 'password', {
  dialect: 'postgres'
});

const User = require('./user');
const Card = require('./card');

const Board = sequelize.define('Board', {
  _id: 'id',
  title: Sequelize.STRING,
  description: Sequelize.TEXT
});
