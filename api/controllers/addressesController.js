const { Address } = require('../_sequelize')

module.exports = {
  getAllAddresses: (req, res) => {
    Address.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
