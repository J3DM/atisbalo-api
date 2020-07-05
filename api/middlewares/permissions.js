const { Log } = require('../helpers/log')
const LocalAsociated = require('../models').LocalAsociated

module.exports = {
  verifyOwner: (req, res, next) => {
    const allowedRoles = ['owner', '4c1e8e00-8061-4657-b1e5-8112de5834de']
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
    const allowedRoles = ['owner', 'admin', '4c1e8e00-8061-4657-b1e5-8112de5834de', 'df009b9d-bf01-4796-9f8c-498f75dfd89a']
    var localId = req.params.idLocal
    if (localId === undefined) {
      localId = req.body.localId
    }
    if (localId === undefined) {
      return res.status(400).json('local_id query parameter or localId body parameter are requiered')
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
        return res.status(500).json(err)
      })
  },
  verifyEmployee: (req, res, next) => {
    const allowedRoles = ['owner', 'admin', 'worker', '4c1e8e00-8061-4657-b1e5-8112de5834de', 'df009b9d-bf01-4796-9f8c-498f75dfd89a', '034a23be-1ab8-4689-8a29-19cc2de24bb3']
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
