const { Rol } = require('../sequelize')
const { Log } = require('../helpers/log')

module.exports = {
  getAllRoles: (req, res) => {
    Rol.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
