
module.exports = (sequelize, DataTypes) => {

  const Card = sequelize.define('Card', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    color: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    content: DataTypes.TEXT,
    due_date: DataTypes.DATE,
    status: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Card.associate = (models) => {
    models.Card.belongsTo(models.Board, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE',
      as: 'board',
    });
    models.Card.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      },
      as: 'owner'
    });
  }

  return Card;
}