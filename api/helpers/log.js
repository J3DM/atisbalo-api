const chalk = require('chalk')
const log = console.log
const { LOG_LEVEL } = require('../../config/constants')
const morgan = require('morgan')
const moment = require('moment')

// TODO: console.log sync?
const Log = {
  debug: (msg) => {
    if (LOG_LEVEL === 'D' || LOG_LEVEL === 'A') {
      log(
        chalk.magenta.bold(timestamp()),
        chalk.bgBlack.blue.bold('DEBUG'),
        msg
      )
    }
  },
  error: (msg) => {
    if (LOG_LEVEL === 'E' || LOG_LEVEL === 'A') {
      log(
        chalk.magenta.bold(timestamp()),
        chalk.bgBlack.redBright.bold('ERROR'),
        msg
      )
    }
  },
  trace: (msg) => {
    if (LOG_LEVEL === 'T' || LOG_LEVEL === 'A') {
      log(
        chalk.magenta.bold(timestamp()),
        chalk.bgBlack.cyan.bold('TRACE'),
        msg
      )
    }
  },
  warning: (msg) => {
    if (LOG_LEVEL === 'W' || LOG_LEVEL === 'A') {
      log(
        chalk.magenta.bold(timestamp()),
        chalk.bgBlack.yellowBright.bold('TRACE'),
        msg
      )
    }
  },
  info: (msg) => {
    if (LOG_LEVEL === 'W' || LOG_LEVEL === 'A') {
      log(
        chalk.magenta.bold(timestamp()),
        chalk.bgBlack.green.bold('INFO'),
        msg
      )
    }
  }
}

const morganChalk = morgan(function (tokens, req, res) {
  return [
    chalk.magenta.bold(timestamp()),
    chalk.blue.bold(tokens.method(req, res)),
    chalk.green.bold(tokens.status(req, res)),
    chalk.white(tokens.url(req, res)),
    chalk.yellow(tokens['response-time'](req, res) + ' ms')
  ].join(' ')
})

const timestamp = () => {
  return '[' + moment().format('MMMM Do YYYY, h:mm:ss a') + ']'
}

module.exports = {
  morganChalk,
  Log
}
