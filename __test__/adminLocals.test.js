/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const userEmail = 'admin620@gmail.com'
const userPassword = 'admin'
var userToken
var localId

describe('Admin Local queries', () => {
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
      expect(associated).toHaveProperty('rol_id')
      expect(associated).toHaveProperty('local_id')
      if (associated.rol_id === '4c1e8e00-8061-4657-b1e5-8112de5834de' || associated.rol_id === 'owner') {
        localId = associated.local_id
      }
    })
    expect(localId).not.toEqual('')
    expect(localId).not.toEqual(undefined)
    done()
  })
  it('Disable the local', async (done) => {
    const res = await app.apiServer.delete('/api/local/' + localId).set('Authorization', userToken)
    expect(res.statusCode).toEqual(200)
    done()
  })
  it('Enable the local', async (done) => {
    const res = await app.apiServer.put('/api/local/' + localId + '/reactivate').set('Authorization', userToken) 
    expect(res.statusCode).toEqual(200)
    done()
  })
  //TODO TRY TO DEACTIVATE A LOCAL THAT THE USER HAS NO RELATIONSHIP WITH
  //TODO TRY TO DEACTIVATE A LOCAL THAT THE USER RELATIONSHIP WITH BUT NOT ENOUGHT ROLES
})
