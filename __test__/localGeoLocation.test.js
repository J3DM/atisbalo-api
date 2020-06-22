/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const lat = 42.2329
const lng = -8.721

const showedLocals = []

describe('GeoLocation Locals query', () => {
  it('Search locals nearby location ' + lat + ', ' + lng, async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng)
    expect(res.statusCode).toEqual(200)
    res.body.rows.forEach(local => {
      showedLocals.push(local.id)
    })
    expect(res.body.rows.length).toEqual(10)
    done()
  })
  it('Search locals nearby location ' + lat + ', ' + lng + ' giving a page and limit', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&pag=' + 1 + '&limit=' + 10)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toEqual(10)
    res.body.rows.forEach(local => {
      expect(showedLocals.includes(local.id)).toEqual(false)
    })
    done()
  })
  it('Search locals nearby location ' + lat + ', ' + lng + ' giving a maximum distance', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&maxdistance=' + 0)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toEqual(0)
    done()
  })
  it('Search locals nearby location ' + lat + ', ' + lng + ' giving: page, limit and maximum distance', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&pag=' + 1 + '&limit=' + 2 + '&maxdistance=' + 10)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toEqual(2)
    done()
  })
})
