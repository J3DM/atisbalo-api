
module.exports = {
  getGeoLocationOrderByParameters: (req, res, next) => {
    const orderArray = []
    for (var propName in req.query) {
      if (propName === 'orderDistance') {
        orderArray.push(['DISTANCE', req.query[propName]])
      } else if (propName === 'maxDistance') {
        req.maxDistance = /^([0-9].)$/.test(req.query[propName]) ? parseInt(req.query[propName]) : 0
      } else if (propName === 'orderRatingService') {
        orderArray.push(['rating', 'service', req.query[propName]])
      }
    }
    req.orderArray = orderArray
    next()
  }
}
