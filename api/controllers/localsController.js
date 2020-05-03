const Local = require('../models').Local
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
  }
}
