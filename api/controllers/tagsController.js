const { Tag } = require('../sequelize')

module.exports = {
  getAllTags: (req, res) => {
    Tag.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
