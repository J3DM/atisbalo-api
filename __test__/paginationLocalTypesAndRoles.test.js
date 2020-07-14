/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

describe('Pagination for localTypes', () => {
  it('paginate localtypes with default parameters', async (done) => {
    const res = await app.apiServer.get('/api/localTypes')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('count')
    expect(res.body).toHaveProperty('rows')
    done()
  })
  it('paginate localtypes passing parameters', async (done) => {
    const res = await app.apiServer.get('/api/localTypes?limit=5&pag=2')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('count')
    expect(res.body).toHaveProperty('rows')
    done()
  })
})

describe('Pagination for Roles', () => {
  it('paginate Roles with default parameters', async (done) => {
    const res = await app.apiServer.get('/api/roles')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('count')
    expect(res.body).toHaveProperty('rows')
    done()
  })
  it('paginate roles passing parameters', async (done) => {
    const res = await app.apiServer.get('/api/roles?limit=1&pag=2')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('count')
    expect(res.body).toHaveProperty('rows')
    done()
  })
})
