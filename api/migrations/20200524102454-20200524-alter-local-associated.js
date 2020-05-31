'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      queryInterface.addConstraint('LocalAsociateds', ['user_id', 'local_id'], {
        type: 'unique',
        name: 'user_local_unique_constraint'
      })
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      queryInterface.removeConstraint('LocalAsociateds', 'user_local_unique_constraint')
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
