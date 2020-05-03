const LocalTag = require('../models').LocalTag
const { Log } = require('../helpers/log')

module.exports = {
  getAllLocalTags: (req, res) => {
    LocalTag.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
