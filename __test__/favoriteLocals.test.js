/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const userEmail = 'admin3@gmail.com'
const userPassword = 'admin'
var accessToken = ''
var favoriteLocalId = ''
var numberOfFavoriteLocalsInDatabase = null
describe('GeoLocation Locals query', () => {
  it('Try to get the list of favourite locals without beeing logged in', async (done) => {
    const res = await app.apiServer.get('/api/user/favoriteLocals')
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
    done()
  })
  it('List favourite locals for the logged User', async (done) => {
    const res = await app.apiServer.get('/api/user/favoriteLocals').set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    favoriteLocalId = res.body[0].id
    expect(favoriteLocalId).not.toBe('')
    numberOfFavoriteLocalsInDatabase = res.body.length
    expect(favoriteLocalId).not.toBe(null)
    done()
  })
  it('Remove favourite local for the logged User', async (done) => {
    const res = await app.apiServer.del('/api/user/favoriteLocals/' + favoriteLocalId).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    const resCheckOperation = await app.apiServer.get('/api/user/favoriteLocals').set('Authorization', accessToken)
    expect(resCheckOperation.statusCode).toEqual(200)
    expect(resCheckOperation.body.length).toEqual(numberOfFavoriteLocalsInDatabase - 1)
    done()
  })
  it('Add favourite local for the logged User', async (done) => {
    const res = await app.apiServer.post('/api/user/favoriteLocals/' + favoriteLocalId).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    const resCheckOperation = await app.apiServer.get('/api/user/favoriteLocals').set('Authorization', accessToken)
    expect(resCheckOperation.statusCode).toEqual(200)
    expect(resCheckOperation.body.length).toEqual(numberOfFavoriteLocalsInDatabase)
    done()
  })
  it('Get all favourtite locals offers for the logged User', async (done) => {
    const res = await app.apiServer.get('/api/user/favoriteLocals/offers').set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    res.body.forEach((offer) => {
      expect(offer).toHaveProperty('title')
      expect(offer).toHaveProperty('description')
      expect(offer).toHaveProperty('promotion')
      expect(offer).toHaveProperty('local_id')
    })
    done()
  })
})
