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
    if (addFavoriteLocal.local_id === undefined || addFavoriteLocal.local_id == null) {
      return res.status(404).json('Local not found with the provided id')
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
    const limit = parseInt(req.query.limit) ? req.query.limit : 30
    const offset = parseInt(req.query.pag) * limit ? req.query.pag : 0

    UserFavoriteLocal.getUsers(req.user.id, limit, offset)
      .then((results) => {
        const pageResult = []
        results.rows.forEach((favoriteLocal) => {
          pageResult.push(favoriteLocal.dataValues.local)
        })
        results.rows = pageResult
        res.status(200).json(results)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  getUserFavoriteLocalsOffers: (req, res) => {
    const limit = parseInt(req.query.limit) ? req.query.limit : 30
    const offset = parseInt(req.query.pag) * limit ? req.query.pag : 0
    UserFavoriteLocal.getOffers(req.user.id)
      .then((results) => {
        const favoriteLocalOffers = []
        results.forEach((favoriteLocal) => {
          favoriteLocal.dataValues.local.dataValues.offers.forEach((offer) => {
            favoriteLocalOffers.push(offer)
          })
        })
        const page = favoriteLocalOffers.slice(parseInt(offset), (parseInt(offset) + parseInt(limit)))
        res.status(200).json({ count: favoriteLocalOffers.length, rows: page })
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
