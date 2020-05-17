const pattern = new RegExp(
  '^({{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}}{0,1})$'
)

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
    {
      hooks: {
        beforeCreate: (local) => {
          local.identifier = `${local.name.replace(/[\W_]+/g, '')}#${Math.floor(
            Math.random() * 1000
          )}`
        },
        afterCreate: (local) => {
          sequelize.models.Rating.create(local.id)
        }
      }
    }
  )
  Local.associate = function (models) {
    Local.hasMany(models.Offer, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'offers'
    })

    Local.belongsTo(models.LocalType, {
      foreignKey: 'localtype_id',
      as: 'localType'
    })

    Local.hasMany(models.Comment, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'comments'
    })
    Local.hasMany(models.UserFavoriteLocal, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      as: 'userFavoriteLocal'
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
  }
  Local.findAllLocalsByType = (type, offset, limit) => {
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

    return Local.findAndCountAll({
      include: includes,
      where: { deleted: false },
      offset: offset,
      limit: limit
    })
  }
  Local.findLocalById = (id) => {
    if (pattern.test(id)) {
      return Local.findOne({
        where: { id: id, deleted: false },
        include: ['offers', 'localType', 'address', 'images', 'tags', 'rating']
      })
    } else {
      return Local.findOne({
        where: {
          identifier: id
        },
        include: ['offers', 'localType', 'address', 'images', 'tags', 'rating']
      })
    }
  }
  Local.findLocalGeo = (lat, lng, type, city, offset, limit) => {
    const includes = [
      'offers',
      'localType',
      'address',
      'images',
      'tags',
      'rating'
    ]
    if (type) {
      includes.push({
        model: sequelize.models.LocalType,
        as: 'localType',
        where: { deleted: false, name: type }
      })
    }
    if (city) {
      includes.push({
        model: sequelize.models.Address,
        as: 'address',
        where: {
          deleted: false,
          city: city
        }
      })
    }
    return Local.findAndCountAll({
      attributes: [
        'id',
        'name',
        'capacity',
        'telephone',
        'description',
        'capacity',
        'identifier',
        'deleted',
        'createdAt',
        'updatedAt',
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
      where: { deleted: false },
      order: sequelize.col('distance'),
      offset: offset,
      limit: limit,
      distinct: true
    })
  }
  Local.updateData = (id, updateData) => {
    return Local.update(updateData, { where: { id: id } })
  }
  Local.erase = (id) => {
    return Local.destroy({ where: { id: id } })
  }
  return Local
}
