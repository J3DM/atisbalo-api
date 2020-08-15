'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn('Locals', 'is_open', {
        type: Sequelize.BOOLEAN
      })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn('Locals', 'is_open')
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
};
