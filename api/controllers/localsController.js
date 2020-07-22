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
    const lat = req.query.lat
    const lng = req.query.lng
    if (lat === undefined || lng === undefined) {
      return res.status(404).send('GeoLocation is needed to search nearby locals')
    }
    const areFull = req.query.haveRoom ? req.query.haveRoom : null
    const localType = req.query.type ? req.query.type : null
    const activeOffers = req.query.activeOffers === 'true' ? req.query.activeOffers : null
    const city = req.query.city ? req.query.city : null
    const limit = parseInt(req.query.limit) ? req.query.limit : 10
    const pagina = parseInt(req.query.pag) ? req.query.pag : 0
    const maxDistance = req.maxDistance ? req.maxDistance : 1000
    const newOffers = req.query.newOffers ? req.query.newOffers : null
    const orderArray = req.orderArray ? req.orderArray : []
    Local.findLocalGeo(lat, lng, localType, city, pagina * limit, limit, activeOffers, maxDistance, areFull, newOffers, orderArray)
      .then((locals) => {
        res.status(200).json(locals)
      })
      .catch((err) => {
        Log.error(err)
        return res.status(500).json(err)
      })
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
  getLocalPrivateData: (req, res) => {
    Local.findLocalByIdWithPrivateData(req.params.id)
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
  },
  listLocals: (req, res) => {
    Local.list()
      .then((locals) => res.status(200).json(locals))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
