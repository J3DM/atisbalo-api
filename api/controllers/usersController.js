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
  findUserById: (req, res) => {
    if (req.user.id !== req.params.id) {
      return res.status(500).json('Cant get this user')
    }
    User.findUserById(req.params.id)
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
