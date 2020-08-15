const LocalActivity = require('../models').LocalActivity
const { Log } = require('../helpers/log')

module.exports = {
  getLocalActivity: (req, res) => {
    const localId = req.params.id
    const page = req.query.page ? parseInt(req.query.page) : 0
    const limit = req.query.limit ? parseInt(req.query.limit) : 10
    const offset = page * limit
    const filterDoc = {
      local_id: localId
    }
    const activityType = req.query.name ? req.query.name : false
    if (activityType) {
      filterDoc.action = activityType
    }
    LocalActivity.get(filterDoc, limit, offset)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
