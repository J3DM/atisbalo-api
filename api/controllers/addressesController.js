const Address = require('../models').Address
const Local = require('../models').Local

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
      .then((result) => {
        Local.updateData(req.body.local_id, { lat: req.body.lat, lng: req.body.lng })
      })
      .then((result) => res.status(200).json(result))
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
      .then((result) => {
        Local.updateData(req.body.local_id, { lat: req.body.lat, lng: req.body.lng })
      })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
