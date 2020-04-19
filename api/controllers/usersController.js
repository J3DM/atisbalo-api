const { User } = require('../_sequelize')

module.exports = {
  getAllUsers: (req, res) => {
    User.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
