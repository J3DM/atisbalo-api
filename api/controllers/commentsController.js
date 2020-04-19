const { Comment } = require('../sequelize')

module.exports = {
  getAllComments: (req, res) => {
    Comment.findAll().then(objects => res.status(200).send(objects)).catch(err => {
      res.status(500).send(err.messaje)
    })
  }
}
