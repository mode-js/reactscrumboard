
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: 3 }
      }
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
  });

  User.associate = (models) => {
    models.User.belongsTo(models.Board, {
      foreignKey: {
        allowNull: false,
      },
      as: 'board',
      onDelete: 'SET NULL'
    })
  }

  //basic research on adding BCrypt to Sequelize

  return User;
}