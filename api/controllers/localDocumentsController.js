const LocalDocument = require('../models').LocalDocuments
const { Log } = require('../helpers/log')

module.exports = {
  getAllLocalDocuments: (req, res) => {
    LocalDocument.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  purchase: (req, res, next) => {
    const quantity = req.body.quantity ? parseInt(req.body.quantity) : false
    if (!quantity) {
      return res.status(404).json('Quantity atribute is required')
    }
    // TODO PENDING OTHER CHECKS FOR VALIDATING THE PURCHASE
    req.localActivity = {
      action: 'purchase atisbalitos',
      user: req.user.firstName,
      local_id: req.params.id
    }
    LocalDocument.incrementAtisbalitos(req.params.id, quantity)
      .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
    next()
  },
  getDocument: (req, res) => {
    const localId = req.params.id
    LocalDocument.getDocument(localId)
      .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  expend: (req, res, next) => {
    const advertUpTime = req.advertUpTime
    req.localActivity = {
      action: 'expend atisbalitos',
      user: req.user.firstName,
      local_id: req.params.id
    }
    LocalDocument.decrementAtisbalitos(req.params.id, advertUpTime)
      .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
    next()
  }
}
