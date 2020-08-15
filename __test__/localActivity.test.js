/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const userEmail = 'admin620@gmail.com'
const userPassword = 'admin'
var localId
var userToken

describe('Open local and update ocupation', () => {
  it('Login with a user that has a local', async (done) => {
    const res = await app.apiServer.post('/api/login').send({ email: userEmail, password: userPassword })
    expect(res.statusCode).toEqual(200)
    userToken = res.body.access_token
    expect(userToken).not.toBe(undefined)
    done()
  })
  it('Get the id for the local that this user owns', async (done) => {
    const res = await app.apiServer.get('/api/user').set('Authorization', userToken)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('localsAsociated')
    res.body.localsAsociated.forEach(associated => {
      if (associated.rol_id === '4c1e8e00-8061-4657-b1e5-8112de5834de' || associated.rol_id === 'owner') {
        localId = associated.local_id
      }
    })
    expect(localId).not.toEqual('')
    expect(localId).not.toEqual(undefined)
    done()
  })
  it('open the local', async (done) => {
    const res = await app.apiServer.put('/api/local/status/' + localId).send({ capacity: 30, status: 'open' }).set('Authorization', userToken)
    expect(res.statusCode).toEqual(200)
    const resCheck = await app.apiServer.get('/api/local/' + localId)
    expect(resCheck.statusCode).toEqual(200)
    expect(resCheck.body.is_open).toEqual(true)
    done()
  })
  it('check the capacity has updated', async (done) => {
    const res = await app.apiServer.get('/api/local/' + localId)
    expect(res.statusCode).toEqual(200)
    expect(res.body.capacity).toEqual(30)
    done()
  })
  it('check in 1 customers', async (done) => {
    const res = await app.apiServer.post('/api/local/occupation/' + localId).set('Authorization', userToken)
    expect(res.statusCode).toEqual(200)
    done()
  })
  it('check the ocupation has updated', async (done) => {
    const res = await app.apiServer.get('/api/local/' + localId)
    expect(res.statusCode).toEqual(200)
    expect(res.body.occupation).toEqual(1)
    done()
  })
  it('check out 1 customers', async (done) => {
    const res = await app.apiServer.delete('/api/local/occupation/' + localId).set('Authorization', userToken)
    expect(res.statusCode).toEqual(200)
    const resCheck = await app.apiServer.get('/api/local/' + localId)
    expect(resCheck.statusCode).toEqual(200)
    expect(resCheck.body.occupation).toEqual(0)
    done()
  })
  it('close the local', async (done) => {
    const res = await app.apiServer.put('/api/local/status/' + localId).send({ capacity: 24, status: 'close' }).set('Authorization', userToken)
    expect(res.statusCode).toEqual(200)
    const resCheck = await app.apiServer.get('/api/local/' + localId)
    expect(resCheck.statusCode).toEqual(200)
    expect(resCheck.body.is_open).toEqual(false)
    done()
  })
  it('checking local activity', async (done) => {
    const res = await app.apiServer.get('/api/local/private/' + localId).set('Authorization', userToken)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('activity')
    done()
  })
})
var atisbalitos
describe('Purchase atisbalitos for a local', () => {
  it('simulate purchase atisbalitos', async (done) => {
    const res = await app.apiServer.post('/api/purchase/' + localId).send({ quantity: 30 }).set('Authorization', userToken)
    expect(res.statusCode).toEqual(200)
    const resCheck = await app.apiServer.get('/api/localdocument/' + localId).set('Authorization', userToken)
    expect(resCheck.statusCode).toEqual(200)
    expect(resCheck.body).toHaveProperty('atisbalitos')
    expect(resCheck.body.atisbalitos).toBeGreaterThan(0)
    atisbalitos = resCheck.body.atisbalitos
    done()
  })
  it('simulate expend atisbalitos', async (done) => {
    const startDate = new Date()
    const endDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    const res = await app.apiServer.post('/api/expend/' + localId).send({ startDate: startDate, endDate: endDate }).set('Authorization', userToken)
    expect(res.statusCode).toEqual(200)
    const resCheck = await app.apiServer.get('/api/localdocument/' + localId).set('Authorization', userToken)
    expect(resCheck.statusCode).toEqual(200)
    expect(resCheck.body).toHaveProperty('atisbalitos')
    expect(resCheck.body.atisbalitos).toBeLessThan(atisbalitos)
    done()
  })
})
