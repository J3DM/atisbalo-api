const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const { morganChalk } = require('./api/services/logService')
var cookieParser = require('cookie-parser')
const routes = require('./api/routes')
const app = express()

const cors = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
}

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(cookieParser())
  .use(compression())
  .use(helmet())
  .use(morganChalk)
  .use(helmet.hidePoweredBy({ setTo: 'Atisbalo Api' }))
  .use(cors)
  .use('/api', routes)

if (process.env.NODE_ENV !== 'production') {
  const swaggerUi = require('swagger-ui-express')
  const swaggerJSDoc = require('swagger-jsdoc')

  const swaggerDefinition = {
    info: {
      title: 'Atisbalo - Api',
      version: '1.0.0',
      description: 'This is the REST API for Atisbalo'
    },
    host: 'localhost:3000',
    basePath: '/api'
  }

  const options = {
    swaggerDefinition,
    apis: ['./docs/*.yaml']
  }

  const swaggerSpec = swaggerJSDoc(options)

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

module.exports = app
