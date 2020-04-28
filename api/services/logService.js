const chalk = require('chalk')
const log = console.log
const { LOG_LEVEL } = require('../../config/constants')
const morgan = require('morgan')
const moment = require('moment')

// TODO: console.log sync?
const Log = {
  debug: (msg) => {
    if (LOG_LEVEL === 'D' || LOG_LEVEL === 'A') {
      log(chalk.magenta.bold(timestamp()), chalk.green('DEBUG'), msg)
    }
  },
  error: (msg) => {
    if (LOG_LEVEL === 'E' || LOG_LEVEL === 'A') {
      log(chalk.magenta.bold(timestamp()), chalk.red('ERROR'), msg)
    }
  },
  trace: (msg) => {
    if (LOG_LEVEL === 'T' || LOG_LEVEL === 'A') {
      log(chalk.magenta.bold(timestamp()), chalk.cyan('TRACE'), msg)
    }
  },
  warning: (msg) => {
    if (LOG_LEVEL === 'W' || LOG_LEVEL === 'A') {
      log(chalk.magenta.bold(timestamp()), chalk.yellowBright('TRACE'), msg)
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
  return '[' + moment().locale('en').format('LLLL') + ']'
}

module.exports = {
  morganChalk,
  Log
}
