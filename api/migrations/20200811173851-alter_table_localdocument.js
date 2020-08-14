'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn('LocalDocuments', 'atisbalitos', {
        type: Sequelize.INTEGER
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
      await queryInterface.removeColumn('LocalDocuments', 'atisbalitos')
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
};
