/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const userEmail = 'admin620@gmail.com'
const userPassword = 'admin'
var userAccessToken
var localId
var publicData

describe('User Favotite Local queries', () => {
  it('Login with the user credentials', async (done) => {
    const res = await app.apiServer.post('/api/login').send({ email: userEmail, password: userPassword })
    expect(res.statusCode).toEqual(200)
    userAccessToken = res.body.access_token
    expect(userAccessToken).not.toEqual(undefined)
    done()
  })
  it('Get users localId', async (done) => {
    const res = await app.apiServer.get('/api/user').set('Authorization', userAccessToken)
    expect(res.statusCode).toEqual(200)
    localId = res.body.localsAsociated[0].local_id
    expect(localId).not.toEqual(undefined)
    done()
  })
  it('Get local data without roles ', async (done) => {
    const res = await app.apiServer.get('/api/local/' + localId)
    expect(res.statusCode).toEqual(200)
    expect(res.body).not.toHaveProperty('followers')
    publicData = res.body
    done()
  })
  it('Get local data with roles ', async (done) => {
    const res = await app.apiServer.get('/api/local/private/' + localId).set('Authorization', userAccessToken)
    expect(res.statusCode).toEqual(200)
    expect(res.body.offers.length).toBeGreaterThanOrEqual(publicData.offers.length)
    expect(res.body).toHaveProperty('userFavoriteLocal')
    done()
  })
})
