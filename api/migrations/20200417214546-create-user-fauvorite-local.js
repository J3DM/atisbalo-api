module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'UserFavoriteLocals',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        user_id: {
          type: Sequelize.UUID,
          unique: 'actions_unique'
        },
        local_id: {
          type: Sequelize.UUID,
          unique: 'actions_unique'
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
        uniqueKeys: {
          actions_unique: {
            fields: ['user_id', 'local_id']
          }
        }
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserFavoriteLocals')
  }
}
