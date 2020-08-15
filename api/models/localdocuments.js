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
  LocalDocuments.incrementAtisbalitos = (idLocal, quantity) => {
    return LocalDocuments.increment({ atisbalitos: quantity }, { where: { local_id: idLocal } })
  }
  LocalDocuments.decrementAtisbalitos = (idLocal, quantity) => {
    return LocalDocuments.decrement({ atisbalitos: quantity }, { where: { local_id: idLocal } })
  }
  LocalDocuments.getDocument = (idLocal) => {
    return LocalDocuments.findOne({ where: { local_id: idLocal } })
  }
  return LocalDocuments
}
