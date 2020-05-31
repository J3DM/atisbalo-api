'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      queryInterface.changeColumn('Rols', 'id', { type: Sequelize.STRING, allowNull: false, primarykey: true })
      queryInterface.changeColumn('Rols', 'updatedAt', { allowNull: true, type: Sequelize.DATE })
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      queryInterface.changeColumn('Rols', 'id', { allowNull: false, primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 })
      queryInterface.changeColumn('Rols', 'updatedAt', { allowNull: false, type: Sequelize.DATE })
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
