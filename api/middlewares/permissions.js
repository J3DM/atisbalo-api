const { Log } = require('../helpers/log')
const LocalAsociated = require('../models').LocalAsociated

module.exports = {
  verifyOwner: (req, res, next) => {
    const allowedRoles = ['owner']
    var localId = req.params.idLocal
    if (localId === undefined) {
      localId = req.body.localId
    }
    LocalAsociated.hasRoles(req.user.id, localId, allowedRoles)
      .then((result) => {
        Log.info('Can the logged user perform operation? ' + (result.length > 0 ? 'YES' : 'NO'))
        if (result.length === 0) {
          return res.status(401).json('You are not authorized for doing this operation')
        }
        req.localsAsociated = result
        next()
      })
      .catch((err) => {
        return res.status(400).json(err)
      })
  },
  verifyManager: (req, res, next) => {
    const allowedRoles = ['owner', 'admin']
    var localId = req.params.idLocal
    if (localId === undefined) {
      localId = req.body.localId
    }
    LocalAsociated.hasRoles(req.user.id, localId, allowedRoles)
      .then((result) => {
        Log.info('Can the logged user perform operation? ' + (result.length > 0 ? 'YES' : 'NO'))
        if (result.length === 0) {
          return res.status(401).json('You are not authorized for doing this operation')
        }
        req.localsAsociated = result
        next()
      })
      .catch((err) => {
        return res.status(400).json(err)
      })
  },
  verifyEmployee: (req, res, next) => {
    const allowedRoles = ['owner', 'admin', 'worker']
    var localId = req.params.idLocal
    if (localId === undefined) {
      localId = req.body.localId
    }
    LocalAsociated.hasRoles(req.user.id, localId, allowedRoles)
      .then((result) => {
        Log.info('Can the logged user perform operation? ' + (result.length > 0 ? 'YES' : 'NO'))
        if (result.length === 0) {
          return res.status(401).json('You are not authorized for doing this operation')
        }
        req.localsAsociated = result
        next()
      })
      .catch((err) => {
        return res.status(400).json(err)
      })
  }
}
