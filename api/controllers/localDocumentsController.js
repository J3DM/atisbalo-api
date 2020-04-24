const { LocalDocument } = require('../sequelize')

module.exports = {
  getAllLocalDocuments: (req, res) => {
    LocalDocument.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        res.status(500).send(err.messaje)
      })
  }
}
