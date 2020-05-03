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
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    Comment.belongsTo(models.Local, { foreignKey: 'local_id', as: 'local' })
  }
  return Comment
}
