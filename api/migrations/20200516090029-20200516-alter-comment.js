'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn(
        'Comments',
        'service',
        {
          type: Sequelize.INTEGER
        }
      )
      await queryInterface.addColumn(
        'Comments',
        'attention',
        {
          type: Sequelize.INTEGER
        }
      )
      await queryInterface.addColumn(
        'Comments',
        'veracity',
        {
          type: Sequelize.INTEGER
        }
      )
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn('Comments', 'service')
      await queryInterface.removeColumn('Comments', 'attention')
      await queryInterface.removeColumn('Comments', 'veracity')
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
