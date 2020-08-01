const Rol = require('../models').Rol
const { Log } = require('../helpers/log')

module.exports = {
  getAllRoles: (req, res) => {
    Rol.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  getRole: (req, res) => {
    Rol.findById(req.params.id)
      .then((rol) => res.status(200).json(rol))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  createRole: (req, res) => {
    const newRol = { id: req.body.id, name: req.body.name }
    Rol.create(newRol)
      .then((rol) => res.status(200).json(rol))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  updateRole: (req, res) => {
    const updateData = { name: req.body.name }
    Rol.updateData(req.params.id, updateData)
      .then((rol) => res.status(200).json(rol))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  eraseRole: (req, res) => {
    Rol.erase(req.params.id)
      .then((rol) => res.status(200).json(rol))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  removeRole: (req, res) => {
    Rol.updateData(req.params.id, { deleted: true })
      .then((rol) => res.status(200).json(rol))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  activateRole: (req, res) => {
    Rol.updateData(req.params.id, { deleted: false })
      .then((rol) => res.status(200).json(rol))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  getRoles: (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10
    const offset = req.query.pag ? parseInt(req.query.pag) * limit : 0
    Rol.paginate({ deleted: false }, offset * limit, limit)
      .then((objects) => res.status(200).json(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
