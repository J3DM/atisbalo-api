module.exports = (sequelize, DataTypes) => {
  const LocalDocuments = sequelize.define(
    'LocalDocuments',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      CIF: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  LocalDocuments.associate = function (models) {
    LocalDocuments.hasMany(models.Document, {
      foreignKey: 'localdocument_id',
      onDelete: 'cascade'
    })
    LocalDocuments.belongsTo(models.Local, {
      foreignKey: 'local_id',
      as: 'local'
    })
  }
  return LocalDocuments
}
