const { UserFauvoriteLocal } = require('../sequelize')

module.exports = {
  getAllUserFauvoriteLocals: (req, res) => {
    UserFauvoriteLocal.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        res.status(500).send(err.messaje)
      })
  }
}
