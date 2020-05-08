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
  },
  getLocalOffers: (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5
    const offset = req.query.offset ? parseInt(req.query.offset) : 0
    Offer.getFromLocalId(req.params.id, offset, limit)
      .then((offers) => res.status(200).json(offers))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  getActiveLocalOffers: (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5
    const offset = req.query.offset ? parseInt(req.query.offset) : 0
    const activeOfferDoc = {
      local_id: req.params.id,
      active: true,
      deleted: false
    }
    Offer.getActiveLocalId(activeOfferDoc, offset, limit)
      .then((offers) => res.status(200).json(offers))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  createLocalOffer: (req, res) => {
    const newOffer = {
      title: req.body.name,
      description: req.body.description,
      promotion: parseInt(req.body.promotion),
      startDate: Date.parse(req.body.startDate),
      endDate: Date.parse(req.body.endDate),
      local_id: req.body.local_id,
      active: false
    }
    if (newOffer.startDate < Date.now()) {
      newOffer.active = true
    }
    if (newOffer.endDate < newOffer.startDate) {
      return res.status(409).json('End date can not be earlier than the start date')
    }
    Offer.create(newOffer)
      .then((offer) => res.status(200).json(offer))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  updateLocalOffer: (req, res) => {
    const updateOffer = {
      title: req.body.name,
      description: req.body.description,
      promotion: parseInt(req.body.promotion),
      startDate: Date.parse(req.body.startDate),
      endDate: Date.parse(req.body.endDate)
    }
    if (updateOffer.startDate < Date.now()) {
      updateOffer.active = true
    } else {
      updateOffer.active = false
    }
    if (updateOffer.endDate < updateOffer.startDate) {
      return res.status(409).json('End date can not be earlier than the start date')
    }
    Offer.udpateData(req.params.id, updateOffer)
      .then((offer) => res.status(200).json(offer))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  removeLocalOffer: (req, res) => {
    Offer.udpateData(req.params.id, { deleted: true })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  reactivateLocalOffer: (req, res) => {
    Offer.udpateData(req.params.id, { deleted: false })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  eraseLocalOffer: (req, res) => {
    Offer.erase(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  getOffer: (req, res) => {
    Offer.findById(req.params.id)
      .then((offer) => res.status(200).json(offer))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
