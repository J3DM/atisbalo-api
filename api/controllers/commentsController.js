const { Comment } = require('../sequelize')
const { Log } = require('../helpers/log')

module.exports = {
  getAllComments: (req, res) => {
    Comment.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
