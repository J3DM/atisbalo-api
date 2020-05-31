const LocalAsociated = require('../models').LocalAsociated
const User = require('../models').User
const { Log } = require('../helpers/log')

module.exports = {
  getAllLocalsAsociated: (req, res) => {
    LocalAsociated.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  getLocalsAsociateds: (req, res) => {
    LocalAsociated.findAsociateds(req.params.idLocal)
      .then((associateds) => res.status(200).json(associateds))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  getLocalsForAsociated: (req, res) => {
    LocalAsociated.findLocals(req.user.id)
      .then((locals) => res.status(200).json(locals))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  createLocalAsociated: async (req, res) => {
    const user = await User.findOneByEmail(req.body.userEmail)
    if (!user) {
      return res.status(404).json('No user found with the provided email')
    }
    const newLocalAssociated = {
      user_id: user.id,
      local_id: req.body.localId,
      rol_id: req.body.rolId
    }
    LocalAsociated.create(newLocalAssociated)
      .then((associated) => res.status(200).json(associated))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  updateLocalAsociated: (req, res) => {
    const updateAssociated = {
      rol_id: req.body.rolId
    }
    LocalAsociated.updateData(req.params.id, updateAssociated)
      .then((associated) => res.status(200).json(associated))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  eraseLocalAsociated: (req, res) => {
    LocalAsociated.erase(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
