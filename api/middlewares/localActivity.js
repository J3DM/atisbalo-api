const LocalActivity = require('../models').LocalActivity

module.exports = {
  addLocalActivity: (req, res) => {
    if (res.statusCode === 200) {
      LocalActivity.create(req.localActivity)
    }
  }
}
