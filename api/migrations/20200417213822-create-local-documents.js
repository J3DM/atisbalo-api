module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LocalDocuments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      CIF: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('LocalDocuments')
  }
}
