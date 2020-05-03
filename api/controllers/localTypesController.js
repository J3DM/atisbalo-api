const LocalType = require('../models').LocalType
const { Log } = require('../helpers/log')

module.exports = {
  createLocalType: (req, res) => {
    LocalType.build(req.body)
      .save()
      .then((author) => res.json(author))
  },
  getAllLocalTypes: (req, res) => {
    LocalType.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
