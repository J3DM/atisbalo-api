const Comment = require('../models').Comment

const { Log } = require('../helpers/log')

module.exports = {
  getAllComments: (req, res) => {
    Comment.findAll()
      .then((objects) => res.status(200).send(objects))
      .catch((err) => {
        Log.error(err)
        res.status(500).send(err)
      })
  },
  getLocalComments: (req, res) => {
    const limit = parseInt(req.query.limit) ? req.query.limit : 10
    const pagina = parseInt(req.query.pag) ? req.query.pag : 0

    Comment.findLocals(req.params.idLocal, limit * pagina, limit)
      .then((comments) => res.status(200).json(comments))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  getComment: (req, res) => {
    Comment.findById(req.params.idLocal)
      .then((comment) => res.status(200).json(comment))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  createComment: (req, res) => {
    const newComment = {
      comment: req.body.comment,
      user_id: req.user.id,
      rating: parseInt(req.body.rating),
      local_id: req.params.idLocal,
      service: parseInt(req.body.service),
      attention: parseInt(req.body.attention),
      veracity: parseInt(req.body.veracity)
    }
    Comment.create(newComment)
      .then((comment) => res.status(200).json(comment))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  updateComment: async (req, res) => {
    const updateComment = {
      comment: req.body.comment,
      rating: parseInt(req.body.rating),
      service: parseInt(req.body.service),
      attention: parseInt(req.body.attention),
      veracity: parseInt(req.body.veracity),
      local_id: req.body.local_id
    }
    const foundComent = await Comment.findById(req.params.id)
    if (foundComent != null) {
      if (
        foundComent.user_id !== req.user.id ||
        foundComent.local_id !== updateComment.local_id
      ) {
        return res
          .status(409)
          .json(
            'You can not eddit a comment from a different user or assing it to a different local'
          )
      }
    }
    Comment.updateData(req.params.id, updateComment)
      .then((comment) => res.status(200).json(comment))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  ractivateComment: async (req, res) => {
    const foundComent = await Comment.findById(req.params.id)
    if (foundComent != null) {
      if (foundComent.user_id !== req.user.id) {
        return res
          .status(409)
          .json('You can not reactivate a comment from a different user')
      }
    }
    Comment.reactivate(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  removeComment: async (req, res) => {
    const foundComent = await Comment.findById(req.params.id)
    if (foundComent != null) {
      if (foundComent.user_id !== req.user.id) {
        return res
          .status(409)
          .json('You can not remove a comment from a different user')
      }
    }
    Comment.remove(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  },
  eraseComment: async (req, res) => {
    const foundComent = await Comment.findById(req.params.id)
    if (foundComent != null) {
      if (foundComent.user_id !== req.user.id) {
        return res
          .status(409)
          .json('You can not erase a comment from a different user')
      }
    }
    Comment.erase(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        Log.error(err)
        res.status(500).json(err)
      })
  }
}
