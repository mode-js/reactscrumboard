
module.exports = (sequelize, DataTypes) => {

  const Board = sequelize.define('Board', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  });

  Board.associate = (models) => {
    models.Card.belongsTo(models.Card, {
      foreignKey: {
        allowNull: false,
      },
      as: 'Card',
    })
  }
 

  return Board;
}