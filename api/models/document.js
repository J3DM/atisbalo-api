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
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  Document.associate = function (models) {
    Document.belongsTo(models.LocalDocuments, {
      foreignKey: 'localdocument_id',
      as: 'localDocument'
    })
  }
  return Document
}
