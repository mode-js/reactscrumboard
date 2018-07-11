
module.exports = (sequelize, DataTypes) => {

  const Permission = sequelize.define('Permissions', {

    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    access_level: DataTypes.INTEGER,

  })

  Permission.associate = (models) => {
    models.User.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      targetKey: 'user_id',
      constraints: false,
      as: 'Permission',
      onDelete: 'CASCADE',
    })
  }
}