/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const lat = 42.2329
const lng = -8.721

describe('Order geoLocation query', () => {
  it('Order by distance DESCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderDistance=DESC')
    expect(res.status).toEqual(200)
    var distance
    res.body.rows.forEach(local => {
      if (distance === undefined) {
        distance = local.distance
      }
      expect(local.distance).toBeLessThanOrEqual(distance)
      distance = local.distance
    })
    const resPag2 = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderDistance=DESC&pag=2')
    resPag2.body.rows.forEach(local => {
      expect(local.distance).toBeLessThanOrEqual(distance)
      distance = local.distance
    })
  })
  it('Order by distance ASCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderDistance=ASC')
    expect(res.status).toEqual(200)
    var distance
    res.body.rows.forEach(local => {
      if (distance === undefined) {
        distance = local.distance
      }
      expect(local.distance).toBeGreaterThanOrEqual(distance)
      distance = local.distance
    })
    const resPag2 = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderDistance=ASC&pag=2')
    resPag2.body.rows.forEach(local => {
      expect(local.distance).toBeGreaterThanOrEqual(distance)
      distance = local.distance
    })
  })
  it('Order by Rating by service ASCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingService=ASC')
    expect(res.status).toEqual(200)
    var lastLocalRating
    res.body.rows.forEach(local => {
      if (lastLocalRating === undefined) {
        lastLocalRating = local.rating.service
      }
      expect(local.rating.service).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.service
    })
    const resPag2 = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingService=ASC&pag=2')
    resPag2.body.rows.forEach(local => {
      expect(local.rating.service).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.service
    })
  })
  it('Order by Rating by service DESCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingService=DESC')
    expect(res.status).toEqual(200)
    var lastLocalRating
    res.body.rows.forEach(local => {
      if (lastLocalRating === undefined) {
        lastLocalRating = local.rating.service
      }
      expect(local.rating.service).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.service
    })
    const resPag2 = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingService=DESC&pag=2')
    resPag2.body.rows.forEach(local => {
      expect(local.rating.service).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.service
    })
  })
  it('Order by Rating by attention DESCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingAttention=DESC')
    expect(res.status).toEqual(200)
    var lastLocalRating
    res.body.rows.forEach(local => {
      if (lastLocalRating === undefined) {
        lastLocalRating = local.rating.attention
      }
      expect(local.rating.attention).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.attention
    })
    const resPag2 = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingAttention=DESC&pag=2')
    resPag2.body.rows.forEach(local => {
      expect(local.rating.attention).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.attention
    })
  })
  it('Order by Rating by attention ASCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingAttention=ASC')
    expect(res.status).toEqual(200)
    var lastLocalRating
    res.body.rows.forEach(local => {
      if (lastLocalRating === undefined) {
        lastLocalRating = local.rating.attention
      }
      expect(local.rating.attention).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.attention
    })
    const resPag2 = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingAttention=ASC&pag=2')
    resPag2.body.rows.forEach(local => {
      expect(local.rating.attention).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.attention
    })
  })
  it('Order by Rating by veracity DESCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingVeracity=DESC')
    expect(res.status).toEqual(200)
    var lastLocalRating
    res.body.rows.forEach(local => {
      if (lastLocalRating === undefined) {
        lastLocalRating = local.rating.veracity
      }
      expect(local.rating.veracity).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.veracity
    })
    const resPag2 = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingVeracity=DESC&pag=2')
    resPag2.body.rows.forEach(local => {
      expect(local.rating.veracity).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.veracity
    })
  })
  it('Order by Rating by veracity ASCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingVeracity=ASC')
    expect(res.status).toEqual(200)
    var lastLocalRating
    res.body.rows.forEach(local => {
      if (lastLocalRating === undefined) {
        lastLocalRating = local.rating.veracity
      }
      expect(local.rating.veracity).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.veracity
    })
    const resPag2 = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingVeracity=ASC&pag=2')
    resPag2.body.rows.forEach(local => {
      expect(local.rating.veracity).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.veracity
    })
  })
  it('Compound order by Rating by veracity ASCENDING, attention ASCENDING, sevice ASCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingVeracity=ASC&orderRatingAttention=ASC&orderRatingService=ASC')
    expect(res.status).toEqual(200)
    var lastVeracityRating
    var lastRatingRating
    var lastServiceRating
    res.body.rows.forEach(local => {
      if (lastVeracityRating === undefined) {
        lastVeracityRating = local.rating.veracity
      }
      if (lastRatingRating === undefined || lastVeracityRating !== local.rating.veracity) {
        lastRatingRating = local.rating.attention
      }
      if (lastServiceRating === undefined || lastVeracityRating !== local.rating.veracity || lastRatingRating !== local.rating.attention) {
        lastServiceRating = local.rating.service
      }
      expect(local.rating.veracity).toBeGreaterThanOrEqual(lastVeracityRating)
      if (local.rating.veracity === lastVeracityRating) {
        expect(local.rating.attention).toBeGreaterThanOrEqual(lastRatingRating)
        if (local.rating.service === lastServiceRating) {
          expect(local.rating.service).toBeGreaterThanOrEqual(lastServiceRating)
        }
      }
      lastVeracityRating = local.rating.veracity
    })
    const resPag2 = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingVeracity=ASC&orderRatingAttention=ASC&orderRatingService=ASC&pag=2')
    resPag2.body.rows.forEach(local => {
      if (lastVeracityRating === undefined) {
        lastVeracityRating = local.rating.veracity
      }
      if (lastRatingRating === undefined || lastVeracityRating !== local.rating.veracity) {
        lastRatingRating = local.rating.attention
      }
      if (lastServiceRating === undefined || lastVeracityRating !== local.rating.veracity || lastRatingRating !== local.rating.attention) {
        lastServiceRating = local.rating.service
      }
      expect(local.rating.veracity).toBeGreaterThanOrEqual(lastVeracityRating)
      if (local.rating.veracity === lastVeracityRating) {
        expect(local.rating.attention).toBeGreaterThanOrEqual(lastRatingRating)
        if (local.rating.service === lastServiceRating) {
          expect(local.rating.service).toBeGreaterThanOrEqual(lastServiceRating)
        }
      }
      lastVeracityRating = local.rating.veracity
    })
  })
  it('Compound order by Rating by veracity ASCENDING, attention DESCENDING, sevice ASCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingVeracity=ASC&orderRatingAttention=DESC&orderRatingService=ASC')
    expect(res.status).toEqual(200)
    var lastVeracityRating
    var lastRatingRating
    var lastServiceRating
    res.body.rows.forEach(local => {
      if (lastVeracityRating === undefined) {
        lastVeracityRating = local.rating.veracity
      }
      if (lastRatingRating === undefined || lastVeracityRating !== local.rating.veracity) {
        lastRatingRating = local.rating.attention
      }
      if (lastServiceRating === undefined || lastVeracityRating !== local.rating.veracity || lastRatingRating !== local.rating.attention) {
        lastServiceRating = local.rating.service
      }
      expect(local.rating.veracity).toBeGreaterThanOrEqual(lastVeracityRating)
      if (local.rating.veracity === lastVeracityRating) {
        expect(local.rating.attention).toBeLessThanOrEqual(lastRatingRating)
        if (local.rating.service === lastServiceRating) {
          expect(local.rating.service).toBeGreaterThanOrEqual(lastServiceRating)
        }
      }
      lastVeracityRating = local.rating.veracity
    })
    const resPag2 = await app.apiServer.get('/api/locals?city=Vigo&lat=' + lat + '&lng=' + lng + '&orderRatingVeracity=ASC&orderRatingAttention=DESC&orderRatingService=ASC&pag=2')
    resPag2.body.rows.forEach(local => {
      if (lastVeracityRating === undefined) {
        lastVeracityRating = local.rating.veracity
      }
      if (lastRatingRating === undefined || lastVeracityRating !== local.rating.veracity) {
        lastRatingRating = local.rating.attention
      }
      if (lastServiceRating === undefined || lastVeracityRating !== local.rating.veracity || lastRatingRating !== local.rating.attention) {
        lastServiceRating = local.rating.service
      }
      expect(local.rating.veracity).toBeGreaterThanOrEqual(lastVeracityRating)
      if (local.rating.veracity === lastVeracityRating) {
        expect(local.rating.attention).toBeLessThanOrEqual(lastRatingRating)
        if (local.rating.service === lastServiceRating) {
          expect(local.rating.service).toBeGreaterThanOrEqual(lastServiceRating)
        }
      }
      lastVeracityRating = local.rating.veracity
    })
  })
})
