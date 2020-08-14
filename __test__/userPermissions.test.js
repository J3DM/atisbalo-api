/* eslint-disable no-undef */
const Helper = require('./helpers/helpers')
const app = new Helper()

const userEmail = 'admin620@gmail.com'
const userPassword = 'admin'
var accessTokenWithRoles = ''
var accessTokenWithNoRoles = ''
var localId = ''
var idRoleAdmin = ''
var idRoleWorker = ''
var newUserRolesId = ''
const newUserData = {
  firstName: 'delete',
  lastName: 'user',
  email: 'user_delete@gmail.com',
  password: 'delete'
}
var ownerId
var inviteLocalId

describe('Check User Permissions', () => {
  it('Login with an user that has roles in a local', async (done) => {
    const res = await app.apiServer.post('/api/login').send({ email: userEmail, password: userPassword })
    expect(res.statusCode).toEqual(200)
    accessTokenWithRoles = res.body.access_token
    done()
  })
  it('User checks his permissions', async (done) => {
    const res = await app.apiServer.get('/api/user').set('Authorization', accessTokenWithRoles)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('localsAsociated')
    ownerId = res.body.id
    res.body.localsAsociated.forEach(associated => {
      expect(associated).toHaveProperty('rol_id')
      expect(associated).toHaveProperty('local_id')
      if (associated.rol_id === '4c1e8e00-8061-4657-b1e5-8112de5834de' || associated.rol_id === 'owner') {
        localId = associated.local_id
        inviteLocalId = localId
      }
    })
    expect(localId).not.toEqual('')
    expect(localId).not.toEqual(undefined)
    done()
  })
  it('Check users roles for a local', async (done) => {
    const res = await app.apiServer.get('/api/localassociateds/' + localId).set('Authorization', accessTokenWithRoles)
    expect(res.statusCode).toEqual(200)
    res.body.forEach(associated => {
      expect(associated).toHaveProperty('rol_id')
      expect(associated).toHaveProperty('local_id')
      expect(associated).toHaveProperty('user_id')
      expect(associated.rol_id).not.toEqual(null)
      expect(associated.local_id).not.toEqual(null)
      expect(associated.user_id).not.toEqual(null)
    })
    done()
  })
})
describe('Create a User for this test', () => {
  it('Create a user to be deleted later', async (done) => {
    const res = await app.apiServer.post('/api/user').send(newUserData)
    expect(res.statusCode).toEqual(200)
    done()
  })
  it('Login with the newly created user', async (done) => {
    const res = await app.apiServer.post('/api/login').send({ email: 'user_delete@gmail.com', password: 'delete' })
    expect(res.statusCode).toEqual(200)
    accessTokenWithNoRoles = res.body.access_token
    done()
  })
  it('User checks his permissions', async (done) => {
    const res = await app.apiServer.get('/api/user').set('Authorization', accessTokenWithNoRoles)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('localsAsociated')
    expect(res.body.localsAsociated.length).toEqual(0)
    done()
  })
})
describe('Grant, Edit and remove Roles for the created user', () => {
  it('Check users roles for a local', async (done) => {
    const res = await app.apiServer.get('/api/localassociateds/' + localId).set('Authorization', accessTokenWithNoRoles)
    expect(res.statusCode).toEqual(401)
    done()
  })
  it('Get available roles', async (done) => {
    const res = await app.apiServer.get('/api/roles/list')
    expect(res.statusCode).toEqual(200)
    res.body.forEach(role => {
      if (role.name === 'Manager') {
        idRoleAdmin = role.id
      } else if (role.name === 'Employee') {
        idRoleWorker = role.id
      }
    })
    expect(idRoleAdmin).not.toEqual('')
    expect(idRoleWorker).not.toEqual('')
    done()
  })
  it('Try to grant roles with no roles for the local', async (done) => {
    const data = {
      userEmail: 'user_delete@gmail.com',
      localId: localId,
      rolId: idRoleWorker
    }
    const res = await app.apiServer.post('/api/localsassociated').send(data).set('Authorization', accessTokenWithNoRoles)
    console.log(res.body)
    expect(res.statusCode).toEqual(401)
    done()
  })
  it('Grant Worker roles to the user', async (done) => {
    const data = {
      userEmail: 'user_delete@gmail.com',
      localId: localId,
      rolId: idRoleWorker
    }
    const res = await app.apiServer.post('/api/localsassociated').send(data).set('Authorization', accessTokenWithRoles)
    expect(res.statusCode).toEqual(200)
    const resCheck = await app.apiServer.get('/api/user').set('Authorization', accessTokenWithNoRoles)
    expect(resCheck.statusCode).toEqual(200)
    expect(resCheck.body).toHaveProperty('localsAsociated')
    expect(resCheck.body.localsAsociated.length).toEqual(1)
    done()
  })
  it('Update Worker role to Admin role for the user', async (done) => {
    const data = {
      userEmail: 'user_delete@gmail.com',
      localId: localId,
      rolId: idRoleAdmin
    }
    const res = await app.apiServer.put('/api/localsassociated').send(data).set('Authorization', accessTokenWithRoles)
    expect(res.statusCode).toEqual(200)
    const resCheck = await app.apiServer.get('/api/user').set('Authorization', accessTokenWithNoRoles)
    expect(resCheck.statusCode).toEqual(200)
    expect(resCheck.body).toHaveProperty('localsAsociated')
    resCheck.body.localsAsociated.forEach(associated => {
      expect(associated.rol_id).not.toEqual(idRoleWorker)
    })
    expect(resCheck.body.localsAsociated.length).toEqual(1)
    newUserRolesId = resCheck.body.localsAsociated[0].id
    done()
  })
  it('Remove roles for the user', async (done) => {
    const res = await app.apiServer.delete('/api/localsassociated/' + localId + '/' + newUserRolesId).set('Authorization', accessTokenWithRoles)
    expect(res.statusCode).toEqual(200)
    const resCheck = await app.apiServer.get('/api/user').set('Authorization', accessTokenWithNoRoles)
    expect(resCheck.statusCode).toEqual(200)
    expect(resCheck.body).toHaveProperty('localsAsociated')
    expect(resCheck.body.localsAsociated.length).toEqual(0)
    done()
  })
  it('Erase the newly created user', async (done) => {
    const res = await app.apiServer.delete('/api/user/erase').set('Authorization', accessTokenWithNoRoles)
    expect(res.statusCode).toEqual(200)
    done()
  })
})
describe('Create a new user with roles for a local', () => {
  it('Creating a new user', async (done) => {
    const res = await app.apiServer.post('/api/user/invited/' + ownerId + '/local/' + inviteLocalId).send(newUserData)
    expect(res.statusCode).toEqual(200)
    done()
  })
  it('Login with the newly created user', async (done) => {
    const res = await app.apiServer.post('/api/login').send({ email: 'user_delete@gmail.com', password: 'delete' })
    expect(res.statusCode).toEqual(200)
    accessTokenWithNoRoles = res.body.access_token
    done()
  })
  it('User checks his permissions', async (done) => {
    const res = await app.apiServer.get('/api/user').set('Authorization', accessTokenWithNoRoles)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('localsAsociated')
    expect(res.body.localsAsociated.length).toEqual(1)
    done()
  })
  it('Erase the newly created user', async (done) => {
    const res = await app.apiServer.delete('/api/user/erase').set('Authorization', accessTokenWithNoRoles)
    expect(res.statusCode).toEqual(200)
    done()
  })
})
