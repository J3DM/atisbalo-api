const { LocalType } = require('../sequelize')

module.exports = {
  createLocalType: (req, res) => {
    LocalType.build(req.body)
      .save()
      .then((author) => res.json(author))
  },
  getAllLocalTypes: (req, res) => {
    LocalType.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        console.log(err)
        res.status(500).send(err.messaje)
      })
  }
}
