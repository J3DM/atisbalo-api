const chalk = require('chalk')
const { LOG_LEVEL } = require('../../config/constants')
const morgan = require('morgan')
const moment = require('moment')
const level = LOG_LEVEL.toUpperCase()
const fs = require('fs');
const util = require('util');
const log_file = fs.createWriteStream('./atblapi.log', {flags : 'w'});
const log_stdout = console.log;

const Log = {
  debug: (msg) => {
    if (level === 'D' || level === 'A') {
      log_file.write(timestamp() +" - "+ util.format(msg) + '\n');
      log_stdout(
        chalk.magenta.bold(timestamp()),
        chalk.bgBlack.blue.bold('DEBUG'),
        msg
      )
    }
  },
  error: (msg) => {
    if (level === 'E' || level === 'A') {
      log_file.write(util.format(msg) + '\n');
      log_stdout(
      
        chalk.magenta.bold(timestamp()),
        chalk.bgBlack.redBright.bold('ERROR'),
        msg
      )
    }
  },
  trace: (msg) => {
    if (level === 'T' || level === 'A') {      
      log_file.write(util.format(msg) + '\n');
      log_stdout(
        chalk.magenta.bold(timestamp()),
        chalk.bgBlack.cyan.bold('TRACE'),
        msg
      )
    }
  },
  warning: (msg) => {
    if (level === 'W' || level === 'A') {
      log_file.write(util.format(msg) + '\n');
      log_stdout(
        chalk.magenta.bold(timestamp()),
        chalk.bgBlack.yellowBright.bold('TRACE'),
        msg
      )
    }
  },
  info: (msg) => {
    if (level === 'W' || level === 'A') {
      log_file.write(util.format(msg) + '\n');
      log_stdout(
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

Log.info(`Loggger started with level ${level}`)

module.exports = {
  morganChalk,
  Log
}
