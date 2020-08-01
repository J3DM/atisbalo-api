'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      queryInterface.addColumn('LocalTypes', 'slug', { type: Sequelize.STRING })
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      queryInterface.removeColumn('LocalTypes', 'slug')
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
