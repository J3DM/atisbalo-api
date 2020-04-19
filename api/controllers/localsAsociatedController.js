const { LocalAsociated } = require('../sequelize')

module.exports = {
  getAllLocalsAsociated: (req, res) => {
    LocalAsociated.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
