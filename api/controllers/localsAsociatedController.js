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
      user_id: user.id ? user.id : false,
      local_id: req.body.localId ? req.body.localId : false,
      rol_id: req.body.rolId ? req.body.rolId : false
    }
    if (!newLocalAssociated.user_id || !newLocalAssociated.local_id || !newLocalAssociated.rol_id) {
      return res.status(400).send('The required fields to create a user role are not present')
    }
    LocalAsociated.create(newLocalAssociated)
      .then((associated) => res.status(200).json(associated))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  updateLocalAsociated: async (req, res) => {
    const user = await User.findOneByEmail(req.body.userEmail)
    const updateAssociated = {
      user_id: user.id ? user.id : false,
      local_id: req.body.localId ? req.body.localId : false,
      rol_id: req.body.rolId ? req.body.rolId : false
    }
    if (!updateAssociated.user_id) {
      updateAssociated.user_id = req.body.userId ? req.body.userId : false
    }
    if (!updateAssociated.user_id || !updateAssociated.local_id || !updateAssociated.rol_id) {
      return res.status(400).send('The required fields to create a user role are not present')
    }
    LocalAsociated.updateData(updateAssociated)
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
