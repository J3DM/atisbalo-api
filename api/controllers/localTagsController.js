const LocalTag = require('../models').LocalTag
const { Log } = require('../helpers/log')

module.exports = {
  getAllLocalTags: (req, res) => {
    LocalTag.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  getLocalTags: (req, res) => {
    LocalTag.getLocals(req.params.id)
      .then((tags) => res.status(200).send(tags))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  createLocalTags: (req, res) => {
    const tagList = []
    const submittedTags = req.body.tags.split(',')
    submittedTags.forEach(tag => {
      tagList.push({ tag_id: tag, local_id: req.params.id })
    })
    LocalTag.createLocals(tagList)
      .then((tags) => res.status(200).send(tags))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  updateLocalTags: (req, res) => {
    const tagList = []
    const submittedTags = req.body.tags.split(',')
    submittedTags.forEach(tag => {
      tagList.push({ tag_id: tag, local_id: req.params.id })
    })
    LocalTag.eraseLocals(req.params.id)
      .then((result) => LocalTag.createLocals(tagList))
      .then((tags) => res.status(200).send(tags))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  }
}
