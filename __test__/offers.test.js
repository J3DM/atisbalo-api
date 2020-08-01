/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const userEmail = 'admin620@gmail.com'
const userPassword = 'admin'
var accessToken = ''
const today = new Date()
const tomorrow = new Date(new Date().setDate(today.getDate() + 1))
const initialPromotion = 30
const offerData = {
  title: 'Title Bla',
  description: 'Description Bla',
  promotion: initialPromotion,
  startDate: today,
  endDate: tomorrow,
  localId: 'test'
}
var localId = ''
var offerId = ''

describe('Offers queries', () => {
  it('Try to create an offer without beeing logged in', async (done) => {
    const res = await app.apiServer.post('/api/offer').send(offerData)
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
  it('Try to create an offer for a local that you do not have permissions', async (done) => {
    const res = await app.apiServer.post('/api/offer').send(offerData).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(401)
    done()
  })
  it('Get one local that the user has prileges to', async (done) => {
    const res = await app.apiServer.get('/api/localsforassociated').set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    localId = res.body[0].local_id
    offerData.localId = localId
    expect(localId).not.toEqual('')
    expect(localId).not.toEqual(undefined)
    expect(localId).not.toEqual(null)
    done()
  })
  it('Try to create an offer without a required field 1/4', async (done) => {
    const badData = {
      title: 'Title Bla',
      promotion: 30,
      startDate: today,
      endDate: (new Date()).setDate(today.getDate() + 1),
      localId: localId
    }
    const res = await app.apiServer.post('/api/offer').send(badData).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(409)
    done()
  })
  it('Try to create an offer without a required field 2/4', async (done) => {
    const badData = {
      title: 'Title Bla',
      description: 'Description Bla',
      promotion: 30,
      endDate: (new Date()).setDate(today.getDate() + 1),
      localId: localId
    }
    const res = await app.apiServer.post('/api/offer').send(badData).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(409)
    done()
  })
  it('Try to create an offer without a required field 3/4', async (done) => {
    const badData = {
      title: 'Title Bla',
      promotion: 30,
      startDate: today,
      endDate: (new Date()).setDate(today.getDate() + 1),
      localId: localId
    }
    const res = await app.apiServer.post('/api/offer').send(badData).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(409)
    done()
  })
  it('Try to create an offer without a required field 4/4', async (done) => {
    const badData = {
      title: 'Title Bla',
      description: 'Description Bla',
      promotion: 30,
      startDate: today,
      localId: localId
    }
    const res = await app.apiServer.post('/api/offer').send(badData).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(409)
    done()
  })
  it('Create an offer', async (done) => {
    const res = await app.apiServer.post('/api/offer').send(offerData).set('Authorization', accessToken)
    offerId = res.body.id
    expect(res.statusCode).toEqual(200)
    expect(offerId).not.toEqual('')
    expect(offerId).not.toEqual(undefined)
    expect(offerId).not.toEqual(null)
    done()
  })
  it('Update an offer', async (done) => {
    offerData.promotion = 40
    const res = await app.apiServer.put('/api/offer/' + offerId).send(offerData).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual([1])
    const resGetOffer = await app.apiServer.get('/api/offer/' + offerId)
    expect(resGetOffer.statusCode).toEqual(200)
    expect(resGetOffer.body.promotion).not.toEqual(initialPromotion)
    done()
  })
  it('List active all active offers of a local', async (done) => {
    const res = await app.apiServer.get('/api/offers/active/' + localId).send(offerData)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toBeGreaterThan(0)
    expect(res.body.count).toBeGreaterThan(0)
    done()
  })
  it('List active all active offers of a local giving pagination', async (done) => {
    const res = await app.apiServer.get('/api/offers/active/' + localId + '?limit=1,pag=1').send(offerData)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toBe(1)
    expect(res.body.count).toBeGreaterThan(0)
    done()
  })
  it('Try to access all public the offers created for a local', async (done) => {
    const res = await app.apiServer.get('/api/offers/' + localId).send(offerData)
    expect(res.statusCode).toEqual(401)
    done()
  })
  it('Access all the offers created for a local', async (done) => {
    const res = await app.apiServer.get('/api/offers/' + localId).send(offerData).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toBeGreaterThan(0)
    expect(res.body.count).toBeGreaterThan(0)
    done()
  })
  it('Access all active offers created for a local', async (done) => {
    const res = await app.apiServer.get('/api/offers/' + localId + '?active=true').send(offerData).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toBeGreaterThan(0)
    expect(res.body.count).toBeGreaterThan(0)
    res.body.rows.forEach(offer => {
      expect(offer.active).toBe(true)
    })
    done()
  })
  it('Access all inactive offers created for a local', async (done) => {
    const res = await app.apiServer.get('/api/offers/' + localId + '?active=false').send(offerData).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toBeGreaterThan(0)
    expect(res.body.count).toBeGreaterThan(0)
    res.body.rows.forEach(offer => {
      expect(offer.active).toBe(false)
    })
    done()
  })
  it('Access all the offers created for a local with pagination', async (done) => {
    const res = await app.apiServer.get('/api/offers/' + localId + '?pag=1&limit=1').send(offerData).set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    expect(res.body.rows.length).toBe(1)
    expect(res.body.count).toBeGreaterThan(0)
    done()
  })
  it('Delete the created offer', async (done) => {
    const res = await app.apiServer.delete('/api/offer/' + offerId + '/' + localId + '/erase').set('Authorization', accessToken)
    expect(res.statusCode).toEqual(200)
    done()
  })
})
