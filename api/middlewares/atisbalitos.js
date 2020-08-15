const LocalDocument = require('../models').LocalDocuments

module.exports = {
  hasEnoughtCurrency: async (req, res, next) => {
    const startDate = req.body.startDate ? new Date(req.body.startDate) : false
    const endDate = req.body.endDate ? new Date(req.body.endDate) : false
    if (!startDate) {
      return res.status(400).json('Start date is required')
    }
    if (!endDate) {
      return res.status(400).json('End date is required')
    }
    if (endDate < startDate) {
      return res.status(400).json('The end date has to be greater than the start date')
    }
    req.advertUpTime = Math.floor((endDate - startDate) / 3600000)
    const response = await LocalDocument.getCurrency(req.params.id)
    if (!response) {
      return res.status(404).json('Local  not found')
    }
    const atisbalitos = response.dataValues.atisbalitos
    if (atisbalitos < req.advertUpTime) {
      return res.status(400).json(`You do not have enought money to put this advert, you have ${atisbalitos} and advert costs ${req.advertUpTime}`)
    }
    next()
  }
}
