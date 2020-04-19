const { LocalImage } = require('../_sequelize')

module.exports = {
  getAllLocalImages: (req, res) => {
    LocalImage.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
