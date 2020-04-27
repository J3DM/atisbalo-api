const { LocalDocument } = require('../sequelize')
const { Log } = require('../services/logService')

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
