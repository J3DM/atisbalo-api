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
      user_id: DataTypes.UUID,
      local_id: DataTypes.UUID,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  Comment.associate = function (models) {
    // associations can be defined here
  }
  return Comment
}
