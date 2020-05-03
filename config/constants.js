const DATABASE_NAME = process.env.DATABASE_NAME || 'atisbalo'
const USERNAME = process.env.DATABASE_USERNAME || 'admin'
const PASSWORD = process.env.DATABASE_PASSWORD || 'admin'
const HOST = process.env.DATABASE_HOST || 'localhost'
const DIALECT = process.env.DATABASE_DIALECT || 'mysql'
const PORT = process.env.PORT || 3000
const LOG_LEVEL = process.env.LOG_LEVEL || 'A'

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'seed-access-token-jwt'
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || 'seed-refresh-token-jwt'
const EXPIRATION_TOKEN = process.env.EXPIRATION_TOKEN || '48h'

const NODE_ENV = process.env.NODE_ENV

const REDIS_URL = process.env.REDIS_URL || 'redis'

if (NODE_ENV === 'docker') {
  process.env.NODE_ENV = 'development'
}

module.exports = {
  DATABASE_NAME,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT,
  PORT,
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  EXPIRATION_TOKEN,
  REDIS_URL,
  LOG_LEVEL
}
