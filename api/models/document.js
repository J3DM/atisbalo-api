module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define(
    'Document',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      url: DataTypes.STRING,
      localDocument_id: DataTypes.UUID,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  Document.associate = function (models) {
    // associations can be defined here
  }
  return Document
}
