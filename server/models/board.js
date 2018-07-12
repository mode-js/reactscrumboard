
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
    models.Board.belongsTo(models.User, {
      foreignKey: 'owner_id',
    });
  },

    Board.associate = (models) => {
      models.Board.hasMany(models.Card, {
        foreignKey: 'board_id',
        onDelete: 'CASCADE',
      });
    }


  return Board;
}