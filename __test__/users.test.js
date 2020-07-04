/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const userEmail = 'admin620@gmail.com'
const userPassword = 'admin'
var userData = {}
var refeshToken = ''

describe('User queries', () => {
  it('Try get user data without beeing logged in', async (done) => {
    const res = await app.apiServer.get('/api/user')
    expect(res.statusCode).toEqual(401)
    done()
  })
  it('Try to login without the required data 1/2', async (done) => {
    const loginData = { email: userEmail }
    const res = await app.apiServer.post('/api/login').send(loginData)
    expect(res.statusCode).toEqual(400)
    done()
  })
  it('Try to login without the required data 2/2', async (done) => {
    const loginData = { password: userPassword }
    const res = await app.apiServer.post('/api/login').send(loginData)
    expect(res.statusCode).toEqual(400)
    done()
  })
  it('Try to login with the wrong password', async (done) => {
    const loginData = { email: userEmail, password: 'bla' }
    const res = await app.apiServer.post('/api/login').send(loginData)
    expect(res.statusCode).toEqual(401)
    done()
  })
  it('Login with a user', async (done) => {
    const loginData = { email: userEmail, password: userPassword }
    const res = await app.apiServer.post('/api/login').send(loginData)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('access_token')
    expect(res.body).toHaveProperty('refresh_token')
    accessToken = res.body.access_token
    refeshToken = res.body.refesh_token
    done()
  })
  it('Get the user data', async (done) => {
    const res = await app.apiServer.get('/api/user').set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    userData = res.body
    expect(res.body).toHaveProperty('favoriteLocals')
    expect(res.body).toHaveProperty('localsAsociated')
    expect(res.body).not.toHaveProperty('updatedAt')
    expect(res.body).not.toHaveProperty('createdAt')
    expect(res.body).not.toHaveProperty('provider')
    expect(res.body).not.toHaveProperty('password')
    expect(res.body).not.toHaveProperty('id')
    expect(res.body.favoriteLocals.length).toBeGreaterThanOrEqual(0)
    expect(res.body.localsAsociated.length).toBeGreaterThanOrEqual(0)
    done()
  })
  it('Update the user data', async (done) => {
    const res = await app.apiServer.put('/api/user').send({ firstName: 'Bla' }).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    const resCheck = await app.apiServer.get('/api/user').set('Authorization', accessToken)
    expect(resCheck.statusCode).toEqual(200)
    expect(resCheck.body.firstName).toEqual('Bla')
    const resUndo = await app.apiServer.put('/api/user').send({ firstName: userData.firstName }).set('Authorization', accessToken)
    expect(resUndo.statusCode).toEqual(200)
    done()
  })
  it('Deactivate User', async (done) => {
    const res = await app.apiServer.delete('/api/user').set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    const resCheck = await app.apiServer.get('/api/user').set('Authorization', accessToken)
    expect(resCheck.statusCode).toEqual(200)
    expect(resCheck.body.deleted).toEqual(true)
    done()
  })
  it('Reactivate User', async (done) => {
    const res = await app.apiServer.put('/api/user/recover').set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    const resCheck = await app.apiServer.get('/api/user').set('Authorization', accessToken)
    expect(resCheck.statusCode).toEqual(200)
    expect(resCheck.body.deleted).toEqual(false)
    done()
  })
  it('Try to logdout without providing the refresh token', async (done) => {
    const res = await app.apiServer.post('/api/logout').send({ refreshToken: refreshToken }).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(400)
    const resCheck = await app.apiServer.get('/api/user').set('Authorization', accessToken)
    expect(resCheck.statusCode).toEqual(200)
    done()
  })
})
