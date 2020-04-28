const { Local, Populate } = require('../sequelize')
const { Log } = require('../services/logService')

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
      identifier: req.body.name,
      localtype_id: req.body.localtype_id
    }
    const localStored = await Local.findAll({
      where: {
        name: newLocal.telephone,
        $or: {
          identifier: newLocal.identifier
        }
      }
    })
    if (localStored) {
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
      .then((local) => res.status(200).json(local))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  getAllLocals: async (req, res) => {
    let query
    query = req.query.query ? (query = req.query.query) : 'All'

    Local.findAll({ include: Populate.Local[query] }).then((locals) => {
      res.status(200).json(locals)
    })
  },
  getLocalsGeo: async (req, res) => {
    let offset, limit, lat, lng, type, query, max

    lat = req.query.lat
      ? (lat = req.query.lat)
      : res.status(500).send('lat is required')
    lng = req.query.lng
      ? (lng = req.query.lng)
      : res.status(500).send('lng is required')
    type = req.query.type
      ? (type = req.query.type)
      : res.status(500).send('type is required')

    max = req.query.max ? (max = req.query.max) : 10000
    query = req.query.query ? (query = req.query.query) : 'AllByType'
    offset = req.query.offset ? (offset = req.query.offset) : (offset = 0)
    limit = req.query.limit ? (limit = req.query.offset) : (limit = 5)

    const locals = await Local.findLocalGeo(
      lat,
      lng,
      Populate.Local[query](type),
      {
        deleted: false
      },
      max,
      offset,
      limit
    ).catch((err) => {
      Log.error(err)
      res.status(500).json(err)
    })

    if (locals.length < 1) {
      res.status(204).json(locals)
    } else {
      res.status(200).json(locals)
    }
  }
}
