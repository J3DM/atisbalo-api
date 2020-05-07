module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'UserFauvoriteLocals',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        user_id: {
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
      },
      {
        indexes: [
          {
            name: 'comboLocalIdUserId',
            unique: true,
            fields: ['user_id', 'local_id']
          }
        ]
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserFauvoriteLocals')
  }
}
