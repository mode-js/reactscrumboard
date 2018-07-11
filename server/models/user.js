const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    _id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      field: 'userid',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: { args: 3 }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: 3 }
      },
      field: 'password',
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
  });

  User.associate = (models) => {
    models.User.belongsTo(models.Board, {
      foreignKey: {
        allowNull: false,
      },
      as: 'board',
      onDelete: 'SET NULL'
    })
  };

  User.beforeCreate((model, options) => {
    return new Promise((resolve, reject) => {
      model.password = bcrypt.hashSync(model.password, bcrypt.genSaltSync(8), null)
      return resolve(model, options);
    });
  })

  // Alternate approach: https://stackoverflow.com/questions/31427566/sequelize-create-model-with-beforecreate-hook

  User.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
  };

  return User;
}