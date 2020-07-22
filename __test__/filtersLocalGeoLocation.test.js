/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const lat = 42.2329
const lng = -8.721

var localTypeId

describe('Filters for find locals geoLocation query ', () => {
  it('Get local types', async (done) => {
    const res = await app.apiServer.get('/api/localTypes/list')
    expect(res.statusCode).toEqual(200)
    res.body.forEach(localType => {
      if (localType.name === 'Salón de belleza') {
        localTypeId = localType.id
      }
    })
    expect(localTypeId).not.toEqual(undefined)
    done()
  })
  it('GeoLocation query with localType', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&type=' + localTypeId)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toEqual(10)
    res.body.rows.forEach(local => {
      expect(local.offerCount).toBeGreaterThanOrEqual(0)
      expect(local.localType.id).toEqual(localTypeId)
    })
    done()
  })
  it('GeoLocation query with active local offers', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&activeOffers=' + true)
    expect(res.body.rows.length).toEqual(10)
    expect(res.statusCode).toEqual(200)
    res.body.rows.forEach(local => {
      expect(local.offerCount).toBeGreaterThanOrEqual(1)
    })
    done()
  })
  it('GeoLocation query with for locals that are full', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&haveRoom=' + true)
    expect(res.statusCode).toEqual(200)
    res.body.rows.forEach(local => {
      expect(local.capacity).toEqual(local.occupation)
    })
    done()
  })
  it('GeoLocation query with for locals that are not full', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&haveRoom=' + false)
    expect(res.statusCode).toEqual(200)
    res.body.rows.forEach(local => {
      expect(local.capacity).toBeGreaterThan(local.occupation)
    })
    done()
  })
  it('GeoLocation query with for locals that have posted an offer in the last hour', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&newOffers=' + 2)
    expect(res.statusCode).toEqual(200)
    done()
  })
})
