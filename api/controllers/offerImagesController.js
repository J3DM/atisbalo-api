const { OfferImage } = require('../_sequelize')

module.exports = {
  getAllOfferImages: (req, res) => {
    OfferImage.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
