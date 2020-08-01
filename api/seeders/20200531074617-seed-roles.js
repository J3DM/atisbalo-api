'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      return queryInterface.bulkInsert('Rols', [
        {
          id: 'owner',
          name: 'Owner',
          createdAt: new Date(),
          updatedAt: null
        },
        {
          id: 'admin',
          name: 'Admin',
          createdAt: new Date(),
          updatedAt: null
        },
        {
          id: 'worker',
          name: 'Worker',
          createdAt: new Date(),
          updatedAt: null
        }
      ])
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      return queryInterface.bulkDelete('Rols', { id: { [Sequelize.Op.in]: ['owner', 'admin', 'worker'] } }, {})
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
