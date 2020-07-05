/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const lat = 42.2329
const lng = -8.721
var localId = ''

describe('Local Panel Queries', () => {
  it('Get the identifying information of the local plus locals logo', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng)
    expect(res.statusCode).toEqual(200)
    res.body.rows.forEach(local => {
      expect(local).toHaveProperty('local_logo')
      expect(local).toHaveProperty('address')
      expect(local).toHaveProperty('address.street')
      expect(local).toHaveProperty('address.postalCode')
      expect(local).toHaveProperty('address.city')
      expect(local).toHaveProperty('address.complete')
      expect(local).toHaveProperty('rating')
      expect(local).toHaveProperty('offers')
    })
    localId = res.body.rows[0].id
    expect(localId).not.toEqual('')
    expect(localId).not.toEqual(undefined)
    done()
  })
  it('Get the active offers for a local', async (done) => {
    const res = await app.apiServer.get('/api/offers/active/' + localId)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('count')
    expect(res.body).toHaveProperty('rows')
    done()
  })
  it('List last 10 ratings ', async (done) => {
    const res = await app.apiServer.get('/api/comments/local/' + localId + '&pag=' + 0 + '&limit=' + 10)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('count')
    expect(res.body).toHaveProperty('rows')
    expect(res.body.count).toBeGreaterThanOrEqual(0)
    expect(res.body.rows.length).toBeGreaterThanOrEqual(0)
    expect(res.body.rows.length).toBeLessThanOrEqual(10)
    done()
  })
})
