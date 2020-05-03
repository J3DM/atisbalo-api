const Document = require('../models').Document
const { Log } = require('../helpers/log')

module.exports = {
  getAllDocuments: (req, res) => {
    Document.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
