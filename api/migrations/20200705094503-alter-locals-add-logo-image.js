'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      queryInterface.addColumn('Locals', 'local_logo', { type: Sequelize.STRING })
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      queryInterface.removeColumn('Locals', 'local_logo')
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
