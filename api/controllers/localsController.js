const Local = require('../models').Local
const LocalAsociated = require('../models').LocalAsociated

const { Log } = require('../helpers/log')
module.exports = {
  createLocal: async (req, res) => {
    const newLocal = {
      name: req.body.name,
      telephone: req.body.telephone,
      description: req.body.description,
      capacity: req.body.capacity,
      occupation: req.body.occupation,
      // Añadir midelware para normalizar el identificador
      // lat y lng no son obligatorias, actualizar al crear su direccion
      localtype_id: req.body.localtype_id
    }
    const localStored = await Local.findAll({
      where: {
        telephone: newLocal.telephone
      }
    })
    Log.error(localStored)
    if (localStored.length !== 0) {
      Log.error(
        `The place with the telephone ${newLocal.telephone} already exists`
      )
      return res
        .status(409)
        .json(
          `The place with the telephone ${newLocal.telephone} already exists`
        )
    }
    Local.build(newLocal)
      .save()
      .then(async (local) => {
        await LocalAsociated.create({ user_id: req.user.id, local_id: local.id, rol_id: 'owner' })
        res.status(200).json(local)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  getLocalsGeo: async (req, res) => {
    let offset, limit, city

    const lat = req.query.lat
    const lng = req.query.lng

    const localType = req.query.type

    city = req.query.city ? (city = req.query.city) : ''
    offset = req.query.offset ? (offset = req.query.offset) : (offset = 0)
    limit = req.query.limit ? (limit = req.query.offset) : (limit = 5)

    if (!lat || !lng) {
      Local.findAllLocalsByType(localType, offset, limit)
        .then((locals) => {
          res.status(200).json(locals)
        })
        .catch((err) => {
          Log.error(err)
          return res.status(500).json(err)
        })
    } else {
      Local.findLocalGeo(lat, lng, localType, city, offset, limit)
        .then((locals) => {
          res.status(200).json(locals)
        })
        .catch((err) => {
          Log.error(err)
          return res.status(500).json(err)
        })
    }
  },
  getLocalByID: (req, res) => {
    Local.findLocalById(req.params.id)
      .then((local) => {
        if (!local) {
          return res
            .status(404)
            .json(`Local whit id ${req.params.id} not found`)
        }
        res.status(200).json(local)
      })
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  updateLocal: (req, res) => {
    const updateLocal = {
      name: req.body.name,
      telephone: req.body.telephone,
      description: req.body.description,
      capacity: req.body.capacity,
      occupation: req.body.occupation,
      // Añadir midelware para normalizar el identificador
      // lat y lng no son obligatorias, actualizar al crear su direccion
      localtype_id: req.body.localtype_id
    }
    Local.updateData(req.params.id, updateLocal)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  reactivateLocal: (req, res) => {
    Local.updateData(req.params.id, { deleted: false })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  removeLocal: (req, res) => {
    Local.updateData(req.params.id, { deleted: true })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  eraseLocal: (req, res) => {
    Local.erase(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
