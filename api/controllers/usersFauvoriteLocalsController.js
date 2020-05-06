const UserFavouriteLocal = require('../models').UserFauvoriteLocal
const { Log } = require('../helpers/log')

module.exports = {
  getAllUserFavouriteLocals: (req, res) => {
    UserFavouriteLocal.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  addToFavouriteLocal: (req, res) => {
    const addFavouriteLocal = {
      local_id: req.params.localId,
      user_id: req.params.id
    }
    UserFavouriteLocal.add(addFavouriteLocal)
      .then(result => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  removeFromFavouriteLocal: (req, res) => {
    const removeFavouriteLocal = {
      local_id: req.params.localId,
      user_id: req.params.id
    }
    UserFavouriteLocal.remove(removeFavouriteLocal)
      .then(result => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  getUserFavouriteLocals: (req, res) => {
    UserFavouriteLocal.getUsers(req.params.id)
      .then(result => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
