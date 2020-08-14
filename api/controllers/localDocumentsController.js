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
    console.log("test1")
    const quantity = req.body.quantity ? parseInt(req.body.quantity) : false
    console.log("test2")
    if (!quantity) {
      return res.status(404).json('Quantity atribute is required')
    }
    // TODO PENDING OTHER CHECKS FOR VALIDATING THE PURCHASE
    req.localActivity = {
      action: 'purchase local',
      user: req.user.firstName,
      local_id: req.params.id
    }
    console.log(req.params.id, quantity)
    LocalDocument.updateAtisbalitos(req.params.id, quantity)
      .then((result) => res.status(200).send(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
    next()
  }
}
