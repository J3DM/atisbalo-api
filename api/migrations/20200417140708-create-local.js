module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locals', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telephone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      capacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      identifier: {
        allowNull: false,
        type: Sequelize.STRING
      },
      localtype_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'LocalTypes',
          key: 'id'
        }
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
    return queryInterface.dropTable('Locals')
  }
}
