const Rating = require('../models').Rating
const { Log } = require('../helpers/log')

module.exports = {
  getAllRatings: (req, res) => {
    Rating.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
