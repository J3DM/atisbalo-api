const { Rating } = require('../sequelize')

module.exports = {
  getAllRatings: (req, res) => {
    Rating.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
