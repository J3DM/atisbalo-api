const UserFavoriteLocal = require('../models').UserFavoriteLocal
const { Log } = require('../helpers/log')

module.exports = {
  getAllUserFavoriteLocals: (req, res) => {
    UserFavoriteLocal.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  addToFavoriteLocal: (req, res) => {
    const addFavoriteLocal = {
      local_id: req.params.localId,
      user_id: req.user.id
    }
    UserFavoriteLocal.add(addFavoriteLocal)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  removeFromFavoriteLocal: (req, res) => {
    const removeFavoriteLocal = {
      local_id: req.params.localId,
      user_id: req.user.id
    }
    UserFavoriteLocal.remove(removeFavoriteLocal)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  getUserFavoriteLocals: (req, res) => {
    UserFavoriteLocal.getUsers(req.user.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  getUserFavoriteLocalsOffers: (req, res) => {
    UserFavoriteLocal.getOffers(req.user.id)
      .then((results) => {
        const favoriteLocalOffers = []
        results.forEach((favoriteLocal) => {
          favoriteLocal.local.offers.forEach((offer) => favoriteLocalOffers.push(offer))
        })
        res.status(200).json(favoriteLocalOffers)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
