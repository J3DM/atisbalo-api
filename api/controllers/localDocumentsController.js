const LocalDocument = require('../models').LocalDocument
const { Log } = require('../helpers/log')

module.exports = {
  getAllLocalDocuments: (req, res) => {
    LocalDocument.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
