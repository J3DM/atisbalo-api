const Offer = require('../models').Offer
const { Log } = require('../helpers/log')

module.exports = {
  getAllOffers: (req, res) => {
    let order = req.query.order
    let by = req.query.by

    if (!['ASC', 'DESC'].includes(order)) {
      order = 'DESC'
    }
    if (!['promotion', 'createdAt', 'endDate'].includes(by)) {
      by = 'createdAt'
    }
    Offer.findAllAndOrder(order, by)
      .then((objects) => res.status(200).json(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
