const { Offer } = require('../sequelize')
const { Log } = require('../services/logService')

module.exports = {
  getAllOffers: (req, res) => {
    Offer.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
