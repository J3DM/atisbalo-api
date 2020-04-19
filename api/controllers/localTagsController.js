const { LocalTag } = require('../_sequelize')

module.exports = {
  getAllLocalTags: (req, res) => {
    LocalTag.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
