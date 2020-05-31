const DATABASE_NAME = process.env.DATABASE_NAME || 'atisbalo'
const DATABASE_HOST = process.env.DATABASE_HOST || '127.0.0.1'
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'admin'
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'admin'
const DIALECT = process.env.DATABASE_DIALECT || 'mysql'
const PORT = process.env.PORT || 3000
const LOG_LEVEL = process.env.LOG_LEVEL || 'A'
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'seed-access-token-jwt'
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || 'seed-refresh-token-jwt'
const EXPIRATION_TOKEN = process.env.EXPIRATION_TOKEN || '48h'
const APP_URL = process.env.APP_URL || 'localhost:3000'
const BUCKET_NAME = process.env.BUCKET_NAME || 'atisbalo'

const NODE_ENV = process.env.NODE_ENV

const CLOUDFRONT_URL =
  process.env.CLOUDFRONT_URL || 'https://d3dahmvh62kn97.cloudfront.net'

const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || 'AKIAJPZNRZ3QIQLIVTQQ'
const S3_SECRET_ACCESS_KEY =
  process.env.S3_SECRET_ACCESS_KEY || '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'

const S3_BUCKET = process.env.S3_BUCKET_IMG || 'atisbalo-img'

const REDIS_URL = process.env.REDIS_URL || 'redis'

if (NODE_ENV === 'docker') {
  process.env.NODE_ENV = 'development'
}

module.exports = {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DIALECT,
  PORT,
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  EXPIRATION_TOKEN,
  REDIS_URL,
  LOG_LEVEL,
  APP_URL,
  BUCKET_NAME,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  CLOUDFRONT_URL,
  S3_BUCKET
}
