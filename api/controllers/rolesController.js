const { Rol } = require('../sequelize')

module.exports = {
  getAllRoles: (req, res) => {
    Rol.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
