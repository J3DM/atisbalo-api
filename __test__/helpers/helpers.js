const supertest = require('supertest')
const app = require('../../app')
class Helper {
  constructor (model) {
    this.apiServer = supertest(app)
    afterAll(() => setTimeout(() => process.exit(0), 1000))
  }
}

module.exports = Helper
