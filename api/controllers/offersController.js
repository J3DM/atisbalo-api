const Offer = require('../models').Offer
const { Log } = require('../helpers/log')

module.exports = {
  getAllOffers: (req, res) => {
    let order = req.query.order
    let by = req.query.by
    let offset, limit, city

    city = req.query.city ? (city = req.query.city) : ''
    offset = req.query.offset ? (offset = req.query.offset) : (offset = 0)
    limit = req.query.limit ? (limit = req.query.offset) : (limit = 5)

    if (!['ASC', 'DESC'].includes(order)) {
      order = 'DESC'
    }
    if (!['promotion', 'createdAt', 'endDate'].includes(by)) {
      by = 'createdAt'
    }
    Offer.findAllAndOrder(order, by, offset, limit, city)
      .then((objects) => res.status(200).json(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
