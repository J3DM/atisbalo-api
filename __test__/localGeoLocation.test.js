/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const lat = 42.2329
const lng = -8.721

const localDistances = []
const localIds = []

describe('GeoLocation Locals query', () => {
  it('Search locals nearby location ' + lat + ', ' + lng, async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng)
    expect(res.statusCode).toEqual(200)
    pos = 0
    res.body.rows.forEach(local => {
      expect(localIds.includes(local.id)).toEqual(false)
      localIds.push(local.id)
      localDistances.push(local.distance)
      pos += 1
    })
    expect(res.body.rows.length).toEqual(10)
    done()
  })
  it('Search locals nearby location ' + lat + ', ' + lng + ' giving a page', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&pag=' + 1)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toEqual(10)
    res.body.rows.forEach(local => {
      expect(localIds.includes(local.id)).toEqual(false)
      localIds.push(local.id)
      localDistances.push(local.distance)
    })
    done()
  })
  it('Search locals nearby location ' + lat + ', ' + lng + ' giving a page', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&pag=' + 2)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toEqual(10)
    res.body.rows.forEach(local => {
      expect(localIds.includes(local.id)).toEqual(false)
      localIds.push(local.id)
      localDistances.push(local.distance)
    })
    done()
  })
  it('Checking that the last 30 locals were given in order from closer to furthest', async (done) => {
    pos = 0
    localDistances.forEach(distance => {
      if (pos > 0) {
        expect(localDistances[pos - 1] <= distance).toEqual(true)
      }
      pos += 1
    })
    done()
  })
  it('Search locals nearby location ' + lat + ', ' + lng + ' giving a page and limit', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&pag=' + 1 + '&limit=' + 3)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toEqual(3)
    done()
  })
  /*
  it('Search locals nearby location ' + lat + ', ' + lng + ' giving a maximum distance', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&maxDistance=' + 0)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toEqual(0)
    done()
  })
  it('Search locals nearby location ' + lat + ', ' + lng + ' giving: page, limit and maximum distance', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&pag=' + 1 + '&limit=' + 2 + '&maxDistance=' + 10)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toEqual(2)
    done()
  })
  */
})
