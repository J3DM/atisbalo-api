const LocalAsociated = require('../models').LocalAsociated
const { Log } = require('../helpers/log')

module.exports = {
  getAllLocalsAsociated: (req, res) => {
    LocalAsociated.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
