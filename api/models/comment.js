module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      comment: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      deleted: DataTypes.BOOLEAN,
      service: DataTypes.INTEGER,
      attention: DataTypes.INTEGER,
      veracity: DataTypes.INTEGER
    },
    {
      hooks: {
        afterCreate: (comment) => {
          return sequelize.models.Rating.calculateRating(comment.local_id, comment)
        },
        beforeDestroy: (comment) => {
          return sequelize.models.Rating.calculateRating(comment.local_id, comment, false)
        },
        beforeUpdate: (comment) => {
          return sequelize.models.Rating.calculateRating(comment.local_id, comment, false)
        },
        afterUpdate: (comment) => {
          return sequelize.models.Rating.calculateRating(comment.local_id, comment, false)
        }
      }
    }
  )
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    Comment.belongsTo(models.Local, { foreignKey: 'local_id', as: 'local' })
  }
  Comment.findLocals = (localId) => {
    return Comment.findAll({ where: { local_id: localId } })
  }
  Comment.findById = (id) => {
    return Comment.findByPk(id)
  }
  Comment.create = (newComment) => {
    return Comment.build(newComment).save()
  }
  Comment.updateData = (id, newData) => {
    return Comment.update(newData, { where: { id: id } })
  }
  Comment.reactivate = (id) => {
    return Comment.update({ deleted: false }, { where: { id: id } })
  }
  Comment.remove = (id) => {
    return Comment.update({ deleted: true }, { where: { id: id } })
  }
  Comment.erase = (id) => {
    return Comment.destroy({ where: { id: id }, individualHooks: true })
  }
  return Comment
}
