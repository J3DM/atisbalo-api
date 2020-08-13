const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const { morgan ,log_file} = require('./api/helpers/log')
var cookieParser = require('cookie-parser')
const routes = require('./api/routes')
const app = express()

const cors = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE'])
  next()
}

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(cookieParser())
  .use(compression())
  .use(helmet())
  .use(morgan('combined', {stream: log_file}) )
  .use(helmet.hidePoweredBy({ setTo: 'Atisbalo Api' }))
  .use(cors)
  .use('/api', routes)

module.exports = app
