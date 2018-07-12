const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  User.associate = (models) => {
    models.User.hasMany(models.Board, {
      foreignKey: 'owner_id',
      onDelete: 'SET NULL',
    });

    models.User.hasMany(models.Card, {
      foreignKey: 'owner_id',
      onDelete: 'SET NULL',
    });
  };

  return User;
}