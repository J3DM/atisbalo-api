const { User } = require('../sequelize')
const { Log } = require('../helpers/log')

module.exports = {
  getAllUsers: (req, res) => {
    User.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  getUserById: (req, res) => {
    User.findAll({
      where: {
        id: req.params.id
      }
    })
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
