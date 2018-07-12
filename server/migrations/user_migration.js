module.exports = {

  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: { len: [3, 50] },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: SEquelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  },

};