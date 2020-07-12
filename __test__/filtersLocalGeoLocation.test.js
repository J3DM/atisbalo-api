/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const lat = 42.2329
const lng = -8.721

var localTypeId

describe('Filters for find locals geoLocation query ', () => {
  it('Get local types', async (done) => {
    const res = await app.apiServer.get('/api/localTypes')
    expect(res.statusCode).toEqual(200)
    done()
    res.body.forEach(localType => {
      if (localType.name === 'Salón de belleza') {
        localTypeId = localType.id
      }
    })
    expect(localTypeId).not.toEqual(undefined)
  })
  it('GeoLocation query with localType', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&type=' + localTypeId)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toEqual(10)
    res.body.rows.forEach(local => {
      expect(local.offers.length).toBeGreaterThanOrEqual(0)
      expect(local.localType.id).toEqual(localTypeId)
    })
    done()
  })
  it('GeoLocation query with active local offers', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&activeOffers=' + true)
    expect(res.body.rows.length).toEqual(10)
    expect(res.statusCode).toEqual(200)
    res.body.rows.forEach(local => {
      expect(local.offers.length).toBeGreaterThanOrEqual(1)
    })
    done()
  })
})
