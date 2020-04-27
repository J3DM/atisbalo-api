const { Address } = require('../sequelize')
const { Log } = require('../services/logService')

module.exports = {
  getAllAddresses: (req, res) => {
    Address.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },

  createAddress: (req, res) => {
    Address.build(req.body)
      .save()
      .then((adress) => res.status(200).send(adress))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
