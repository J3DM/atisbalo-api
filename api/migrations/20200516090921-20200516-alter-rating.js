module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn('Ratings', 'service')
      await queryInterface.removeColumn('Ratings', 'attention')
      await queryInterface.removeColumn('Ratings', 'veracity')
      await queryInterface.addColumn('Ratings', 'service', {
        type: Sequelize.FLOAT
      })
      await queryInterface.addColumn('Ratings', 'attention', {
        type: Sequelize.FLOAT
      })
      await queryInterface.addColumn('Ratings', 'veracity', {
        type: Sequelize.FLOAT
      })
      await queryInterface.addColumn('Ratings', 'number_comments', {
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
      await queryInterface.removeColumn('Ratings', 'service')
      await queryInterface.removeColumn('Ratings', 'attention')
      await queryInterface.removeColumn('Ratings', 'veracity')
      await queryInterface.removeColumn('Ratings', 'number_comments')
      await queryInterface.addColumn('Ratings', 'service', {
        type: Sequelize.STRING
      })
      await queryInterface.addColumn('Ratings', 'attention', {
        type: Sequelize.STRING
      })
      await queryInterface.addColumn('Ratings', 'veracity', {
        type: Sequelize.STRING
      })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
