const Tag = require('../models').Tag
const { Log } = require('../helpers/log')

module.exports = {
  getAllTags: (req, res) => {
    Tag.findAll({ where: { deleted: false } })
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
