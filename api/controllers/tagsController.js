const Tag = require('../models').Tag
const { Log } = require('../helpers/log')

module.exports = {
  getAllTags: (req, res) => {
    Tag.List({ where: { deleted: false } })
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  createTag: (req, res) => {
    const newTag = {
      name: req.body.name
    }
    const foundTagWithName = Tag.findByName(newTag.name)
    if (foundTagWithName != null) {
      return res
        .status(409)
        .json(`A tag allready exists with the name ${newTag.name}`)
    }
    Tag.create(newTag)
      .then((tag) => res.status(200).json(tag))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  updateTag: (req, res) => {
    const updateDoc = {
      name: req.body.name
    }
    Tag.updateData(req.params.id, updateDoc)
      .then((tag) => res.status(200).json(tag))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  eraseTag: (req, res) => {
    Tag.erase(req.params.id)
      .then((tag) => res.status(200).json(tag))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  deleteTag: (req, res) => {
    Tag.remove(req.params.id)
      .then((tag) => res.status(200).json(tag))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  getTag: (req, res) => {
    Tag.findById(req.params.id)
      .then((tag) => res.status(200).json(tag))
      .catch((err) => {
        Log.error(err)
        res.status(500)
      })
  },
  activateTag: (req, res) => {
    const updateDoc = {
      deleted: false
    }
    Tag.updateData(req.params.id, updateDoc)
      .then((tag) => res.status(200).json(tag))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
