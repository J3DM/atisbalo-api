module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LocalOwns', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      credits: {
        type: Sequelize.INTEGER
      },
      local_id: {
        type: Sequelize.UUID,
        unique: true
      },
      deleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('LocalOwns')
  }
}
