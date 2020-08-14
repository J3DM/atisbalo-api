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
        req.localActivity = {
          action: 'create local',
          user: req.user.firstName,
          local_id: local.id
        }
        res.status(200).json(local.dataValues)
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
  updateLocal: (req, res, next) => {
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
    req.localActivity = {
      action: 'update local',
      user: req.user.firstName,
      local_id: req.params.id
    }
    Local.updateData(req.params.id, updateLocal)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
    next()
  },
  reactivateLocal: (req, res, next) => {
    req.localActivity = {
      action: 'reactivate local',
      user: req.user.firstName,
      local_id: req.params.id
    }
    Local.updateData(req.params.id, { deleted: false })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
    next()
  },
  removeLocal: (req, res, next) => {
    req.localActivity = {
      action: 'deactivate local',
      user: req.user.firstName,
      local_id: req.params.id
    }
    Local.updateData(req.params.id, { deleted: true })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
    next()
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
  },
  addOccupation: (req, res, next) => {
    req.localActivity = {
      action: 'increase occupation',
      user: req.user.firstName,
      local_id: req.params.id
    }
    Local.increaseOccupation(req.params.id)
      .then((updateLocal) => res.status(200).json(updateLocal))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
    next()
  },
  removeOccupation: (req, res, next) => {
    req.localActivity = {
      action: 'decrease occupation',
      user: req.user.firstName,
      local_id: req.params.id
    }
    Local.decreaseOccupation(req.params.id)
      .then((updateLocal) => res.status(200).json(updateLocal))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
    next()
  },
  openClose: (req, res, next) => {
    req.localActivity = {
      user: req.user.firstName,
      local_id: req.params.id
    }
    const updateStatusDoc = {
      capacity: req.body.capacity ? parseInt(req.body.capacity) : 0,
      occupation: 0
    }
    if (req.body.status === 'open') {
      updateStatusDoc.is_open = true
      req.localActivity.action = 'open local'
      updateStatusDoc.occupation = req.body.occupation
    } else if (req.body.status === 'close') {
      req.localActivity.action = 'close local'
      updateStatusDoc.is_open = false
    }
    Local.updateData(req.params.id, updateStatusDoc)
      .then((updateLocal) => res.status(200).json(updateLocal))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
    next()
  }
}
