const Offer = require('../models').Offer
const { Log } = require('../helpers/log')

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
