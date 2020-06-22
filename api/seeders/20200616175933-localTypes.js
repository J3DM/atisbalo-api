'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      return queryInterface.bulkInsert('LocalTypes', [
        {
          id: 'restaurantes',
          name: 'Restaurantes',
          createdAt: new Date(),
          updatedAt: null
        },
        {
          id: 'panaderias',
          name: 'Panaderías',
          createdAt: new Date(),
          updatedAt: null
        },
        {
          id: 'fruteria',
          name: 'Fruterías',
          createdAt: new Date(),
          updatedAt: null
        },
        {
          id: 'carniceria',
          name: 'Carnicerías',
          createdAt: new Date(),
          updatedAt: null
        },
        {
          id: 'pub',
          name: 'Pub',
          createdAt: new Date(),
          updatedAt: null
        },
        {
          id: 'discoteca',
          name: 'Discoteca',
          createdAt: new Date(),
          updatedAt: null
        },
        {
          id: 'tienda',
          name: 'Tienda',
          createdAt: new Date(),
          updatedAt: null
        },
        {
          id: 'bar',
          name: 'Bar',
          createdAt: new Date(),
          updatedAt: null
        },
        {
          id: 'otros',
          name: 'Otros',
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
      return queryInterface.bulkDelete('LocalTypes', { id: { [Sequelize.Op.in]: ['restaurantes', 'panaderias', 'fruteria', 'carniceria', 'pub', 'discoteca', 'discoteca', 'tienda', 'bar', 'otros'] } }, {})
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
