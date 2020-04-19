const { Document } = require('../sequelize')

module.exports = {
  getAllDocuments: (req, res) => {
    Document.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
