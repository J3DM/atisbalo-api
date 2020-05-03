const OfferImage = require('../models').OfferImage
const { Log } = require('../helpers/log')

module.exports = {
  getAllOfferImages: (req, res) => {
    OfferImage.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
