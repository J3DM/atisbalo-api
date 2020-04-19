const DATABASE_NAME = process.env.DATABASE_NAME || 'atisbalo'
const USERNAME = process.env.DATABASE_USERNAME || 'admin'
const PASSWORD = process.env.DATABASE_PASSWORD || 'admin'
const HOST = process.env.DATABASE_HOST || 'localhost'
const DIALECT = process.env.DATABASE_DIALECT || 'mysql'
const PORT = process.env.PORT || 3000
const SEDD_TOKEN = process.env.SEED_TOKEN || 'seed-develop-token-jwt'
const EXPIRATION_TOKEN = process.env.EXPIRATION_TOKEN || '48h'
const NODE_ENV = process.env.NODE_ENV

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
  SEDD_TOKEN,
  EXPIRATION_TOKEN
}
