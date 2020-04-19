module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LocalTags', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      tag_id: {
        type: Sequelize.UUID
      },
      local_id: {
        type: Sequelize.UUID
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
    return queryInterface.dropTable('LocalTags')
  }
}
