/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const lat = 42.2329
const lng = -8.721

describe('Order geoLocation query', () => {
  it('Order by distance DESCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&orderDistance=DESC')
    expect(res.status).toEqual(200)
    var distance
    res.body.rows.forEach(local => {
      if (distance === undefined) {
        distance = local.distance
      }
      expect(local.distance).toBeLessThanOrEqual(distance)
      distance = local.distance
    })
    const resPag2 = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&orderDistance=DESC&pag=2')
    resPag2.body.rows.forEach(local => {
      expect(local.distance).toBeLessThanOrEqual(distance)
      distance = local.distance
    })
  })
  it('Order by distance ASCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&orderDistance=ASC')
    expect(res.status).toEqual(200)
    var distance
    res.body.rows.forEach(local => {
      if (distance === undefined) {
        distance = local.distance
      }
      expect(local.distance).toBeGreaterThanOrEqual(distance)
      distance = local.distance
    })
    const resPag2 = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&orderDistance=ASC&pag=2')
    resPag2.body.rows.forEach(local => {
      expect(local.distance).toBeGreaterThanOrEqual(distance)
      distance = local.distance
    })
  })
  it('Order by Rating by service ASCENDING', async () => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&orderRatingService=ASC')
    expect(res.status).toEqual(200)
    var lastLocalRating
    res.body.rows.forEach(local => {
      console.log(local.rating)
      if (lastLocalRating === undefined) {
        lastLocalRating = local.rating.service
      }
      expect(local.rating.service).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.service
    })
    const resPag2 = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&orderRatingService=ASC&pag=2')
    resPag2.body.rows.forEach(local => {
      expect(local.rating.service).toBeGreaterThanOrEqual(lastLocalRating)
      lastLocalRating = local.rating.service
    })
  })
})
