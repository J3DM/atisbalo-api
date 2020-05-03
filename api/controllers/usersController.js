const User = require('../models').User
const { Log } = require('../helpers/log')

module.exports = {
  getAllUsers: (req, res) => {
    User.getAllUsers()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  getUserById: (req, res) => {
    User.getUserById(req.params.id)
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
