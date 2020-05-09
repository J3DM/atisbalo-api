const Address = require('../models').Address

const { Log } = require('../helpers/log')

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
  },

  updateAddress: (req, res) => {
    const updateData = {
      street: req.body.street,
      number: req.body.number,
      postalCode: req.body.postalCode,
      city: req.body.city,
      province: req.body.province,
      local_id: req.body.local_id
    }
    Address.updateData(req.params.id, updateData)
      .then((result) => res.status(200).send(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
