/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const userEmail = 'admin620@gmail.com'
const userPassword = 'admin'
var userToken
var localId
const newPhone = '123 456 739'
const newLocalData = {
  name: 'Awesome',
  telephone: '134 234 344',
  description: 'some awesome description',
  capacity: 40,
  occupation: 0,
  localtype_id: '21638001-7da3-4b7b-87ff-d30a24acf996'
}
const updateData = {
  name: undefined,
  telephone: undefined,
  description: undefined,
  capacity: undefined,
  occupation: undefined,
  localtype_id: undefined
}

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
      if (associated.rol_id === '4c1e8e00-8061-4657-b1e5-8112de5834de' || associated.rol_id === 'owner') {
        localId = associated.local_id
      }
    })
    expect(localId).not.toEqual('')
    expect(localId).not.toEqual(undefined)
    done()
  })
  it('Try to disable the local', async (done) => {
    const res = await app.apiServer.delete('/api/local/' + localId)
    expect(res.statusCode).toEqual(401)
    done()
  })
  it('Try to enable the local', async (done) => {
    const res = await app.apiServer.put('/api/local/' + localId + '/reactivate')
    expect(res.statusCode).toEqual(401)
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
  it('Try to change local data', async (done) => {
    const res = await app.apiServer.get('/api/local/' + localId)
    expect(res.statusCode).toEqual(200)
    updateData.name = res.body.name
    updateData.telephone = newPhone
    updateData.description = res.body.description
    updateData.capacity = res.body.capacity
    updateData.occupation = res.body.occupation
    updateData.localtype_id = res.body.localtype_id
    updateData.local_logo = ''
    const resUpdate = await app.apiServer.put('/api/local/' + localId).send(updateData)
    expect(resUpdate.statusCode).toEqual(401)
    done()
  })
  it('Change local data', async (done) => {
    var res = await app.apiServer.get('/api/local/' + localId)
    expect(res.statusCode).toEqual(200)
    const oldTelephone = res.body.telephone
    var resUpdate = await app.apiServer.put('/api/local/' + localId).send(updateData).set('Authorization', userToken)
    expect(resUpdate.statusCode).toEqual(200)
    res = await app.apiServer.get('/api/local/' + localId)
    expect(res.body.telephone).toEqual(newPhone)
    updateData.telephone = oldTelephone
    expect(updateData.telephone).toEqual(oldTelephone)
    resUpdate = await app.apiServer.put('/api/local/' + localId).send(updateData).set('Authorization', userToken)
    expect(resUpdate.statusCode).toEqual(200)
    res = await app.apiServer.get('/api/local/' + localId)
    expect(res.body.telephone).toEqual(oldTelephone)
    done()
  })

  it('Create a local', async (done) => {
    const res = await app.apiServer.post('/api/locals').send(newLocalData).set('Authorization', userToken)
    expect(res.statusCode).toEqual(200)
    localId = res.body.id
    expect(localId).not.toEqual(undefined)
    done()
  })
  it('Delete a local', async (done) => {
    const resDelete = await app.apiServer.delete('/api/local/' + localId + '/erase').set('Authorization', userToken)
    expect(resDelete.statusCode).toEqual(200)
    done()
  })
})
