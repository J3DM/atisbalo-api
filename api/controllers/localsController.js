const { Local, LocalType } = require('../sequelize')

module.exports = {
  createLocal: (req, res) => {
    Local.build(req.body).save().then(local => res.json(local)).catch(err => {
      res.json(err)
    })
  },
  getLocals: (req, res) => {
    Local.findAll({
      include: [
        { model: LocalType }
      ]
    }).then(locals => res.json(locals)).catch(err => {
      res.json(err.toString())
    })
  }
}
