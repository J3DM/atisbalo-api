const Helper = require('./helpers/helpers')
const app = new Helper()

const lat = 42.2329
const lng = -8.721

describe('GeoLocation Locals query', () => {
  it('Search locals nearby location ' + lat + ', ' + lng, async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng)
    expect(res.statusCode).toEqual(200)
    done()
  })
  it('Search locals nearby location ' + lat + ', ' + lng + ' giving a page and limit', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&pag=' + 2 + '&limit=' + 2)
    expect(res.statusCode).toEqual(200)
    done()
  })
  it('Search locals nearby location ' + lat + ', ' + lng + ' giving a maximum distance', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&maxdistance=' + 0)
    expect(res.statusCode).toEqual(200)
    done()
  })
  it('Search locals nearby location ' + lat + ', ' + lng + ' giving: page, limit and maximum distance', async (done) => {
    const res = await app.apiServer.get('/api/locals?lat=' + lat + '&lng=' + lng + '&pag=' + 2 + '&limit=' + 2 + '&maxdistance=' + 10)
    expect(res.statusCode).toEqual(200)
    done()
  })
})
