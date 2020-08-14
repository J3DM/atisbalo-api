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
      deleted: DataTypes.BOOLEAN,
      atisbalitos: DataTypes.INTEGER
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
  LocalDocuments.updateAtisbalitos = (id, quantity) => {
    console.log(quantity, typeof quantity)
    LocalDocuments.increment('atisbalitos', { by: quantity, where: { id: id } })
  }
  return LocalDocuments
}
