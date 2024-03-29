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
      occupation: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      identifier: {
        allowNull: false,
        type: Sequelize.STRING
      },
      localtype_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      deleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lat: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      lng: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0
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
