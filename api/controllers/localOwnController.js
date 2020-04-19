const { LocalOwn } = require('../_sequelize')

module.exports = {
  getAllLocalOwns: (req, res) => {
    LocalOwn.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
