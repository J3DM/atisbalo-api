module.exports = (sequelize, DataTypes) => {
  const Local = sequelize.define(
    'Local',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      telephone: DataTypes.STRING,
      description: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      occupation: DataTypes.INTEGER,
      identifier: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN,
      lng: DataTypes.FLOAT,
      lat: DataTypes.FLOAT
    },
    {}
  )
  Local.associate = function (models) {
    Local.hasMany(models.Comment, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'comments'
    })
    Local.hasMany(models.UserFauvoriteLocal, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'userFauvoriteLocal'
    })
    Local.hasMany(models.LocalAsociated, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'localAsociated'
    })
    Local.hasOne(models.LocalOwn, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'localOwn'
    })
    Local.hasOne(models.LocalDocuments, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'documents'
    })
    Local.hasOne(models.Rating, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'rating'
    })
    Local.hasOne(models.Address, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'address'
    })
    Local.hasMany(models.Offer, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'offers'
    })
    Local.hasMany(models.LocalImage, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'images'
    })
    Local.hasMany(models.LocalTag, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'tags'
    })
    Local.belongsTo(models.LocalType, {
      foreignKey: 'localType_id',
      as: 'localType'
    })
  }
  Local.findAllLocalsByType = (type, where, offset, limit) => {
    let includes
    if (type) {
      includes = [
        {
          model: sequelize.models.LocalType,
          as: 'localType',
          where: { deleted: false, name: type }
        },
        'offers',
        'address',
        'images',
        'tags',
        'rating'
      ]
    } else {
      includes = ['offers', 'localType', 'address', 'images', 'tags', 'rating']
    }

    return Local.findAll({
      include: includes,
      where: where,
      offset: offset,
      limit: limit
    })
  }
  Local.findLocalGeo = (lat, lng, type, where, maxDistance, offset, limit) => {
    let includes
    if (type) {
      includes = [
        {
          model: sequelize.models.LocalType,
          as: 'localType',
          where: { deleted: false, name: type }
        },
        'offers',
        'address',
        'images',
        'tags',
        'rating'
      ]
    } else {
      includes = ['offers', 'localType', 'address', 'images', 'tags', 'rating']
    }

    return Local.findAll({
      attributes: [
        'id',
        'name',
        'capacity',
        'telephone',
        'description',
        'capacity',
        'identifier',
        [
          sequelize.literal(
            '6371 * acos(cos(radians(' +
              lat +
              ')) * cos(radians(lat)) * cos(radians(' +
              lng +
              ') - radians(lng)) + sin(radians(' +
              lat +
              ')) * sin(radians(lat)))'
          ),
          'distance'
        ]
      ],
      include: includes,
      where: where,
      having: sequelize.literal('distance < ' + maxDistance),
      order: sequelize.col('distance'),
      offset: offset,
      limit: limit
    })
  }
  return Local
}
