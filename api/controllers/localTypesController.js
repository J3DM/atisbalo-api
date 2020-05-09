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
  },
  getLocalType: (req, res) => {
    LocalType.findById(req.params.id)
      .then((localType) => res.status(200).json(localType))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  updateLocalType: (req, res) => {
    const updateData = {
      name: req.body.name
    }
    LocalType.updateData(req.params.id, updateData)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  reactivateLocalType: (req, res) => {
    LocalType.updateData(req.params.id, { deleted: false })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  removeLocalType: (req, res) => {
    LocalType.updateData(req.params.id, { deleted: true })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  eraseLocalType: (req, res) => {
    LocalType.erase(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  getActiveLocalTypes: (req, res) => {
    LocalType.filterSearch({ deleted: false })
      .then((objects) => res.status(200).json(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
