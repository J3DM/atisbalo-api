const nodemailer = require('nodemailer')
const { APP_URL } = require('../../config/constants')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'atisbalo.noreply@gmail.com',
    pass: 'atisbalo13'
  }
})

const sendMailVerification = function (mail, token) {
  const mailOptions = {
    from: 'atisbalo.noreply@gmail.com',
    to: mail.toLowerCase(),
    subject: 'Email Confirmation',
    html:
      '<p>Click <a href="' +
      APP_URL +
      '/api/verify/' +
      token +
      '">here</a> to verify your account</p>'
  }
  return transporter.sendMail(mailOptions)
}

const sendMailRecoveryPassword = function (mail, token) {
  const mailOptions = {
    from: 'atisbalo.noreply@gmail.com',
    to: mail.toLowerCase(),
    subject: 'Email Confirmation',
    html:
      '<p>Click <a href="' +
      APP_URL +
      '/api/recovery/password' +
      token +
      '">here</a> to verify your account</p>'
  }
  return transporter.sendMail(mailOptions)
}

module.exports = {
  sendMailVerification,
  sendMailRecoveryPassword
}
