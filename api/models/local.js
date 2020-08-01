const pattern = new RegExp(
  '^({{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}}{0,1})$'
)
const Sequelize = require('sequelize')
const { sequelize } = require('.')
module.exports = (sequelize, DataTypes) => {
  const Op = Sequelize.Op
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
        },
        afterBulkUpdate: async (local) => {
          if (local.fields.includes('deleted')) {
            if (local.attributes.deleted) {
              sequelize.models.LocalAsociated.removeLocalAssociations(local.where.id)
            } else {
              sequelize.models.LocalAsociated.reactivateLocalAssociations(local.where.id)
            }
          }
        }
      }
    }
  )
  Local.associate = function (models) {
    Local.hasMany(models.Offer, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'offers'
    })

    Local.belongsTo(models.LocalType, {
      foreignKey: 'localtype_id',
      as: 'localType'
    })

    Local.hasMany(models.Comment, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'comments'
    })
    Local.hasMany(models.UserFavoriteLocal, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'userFavoriteLocal'
    })
    Local.hasMany(models.LocalAsociated, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'localAsociated'
    })
    Local.hasOne(models.LocalOwn, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'localOwn'
    })
    Local.hasOne(models.LocalDocuments, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'documents'
    })
    Local.hasOne(models.Rating, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'rating'
    })
    Local.hasOne(models.Address, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'address'
    })
    Local.hasMany(models.LocalImage, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'images'
    })
    Local.hasMany(models.LocalTag, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'tags'
    })
    Local.hasMany(models.LocalActivity, {
      foreignKey: 'local_id',
      onDelete: 'cascade',
      hooks: true,
      as: 'activity'
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
    if (!pattern.test(id)) {
      return Local.findOne({
        where: {
          identifier: id
        },
        include: [
          {
            model: sequelize.models.Offer,
            as: 'offers',
            attributes: ['id']
          },
          'localType',
          'address',
          {
            model: sequelize.models.LocalImage,
            as: 'images',
            attributes: ['url']
          },
          'tags',
          'rating'],
        attributes: [
          'id', 'name', 'capacity', 'telephone', 'description', 'occupation',
          'identifier', 'deleted', 'createdAt', 'updatedAt', 'local_logo',
          [Sequelize.fn('COUNT', Sequelize.col('offers.local_id')), 'offerCount']
        ]
      })
    } else {
      return Local.findOne({
        where: { id: id },
        include: [
          {
            model: sequelize.models.Offer,
            as: 'offers',
            attributes: ['id']
          },
          'localType',
          'address',
          {
            model: sequelize.models.LocalImage,
            as: 'images',
            attributes: ['url']
          },
          'tags',
          'rating'],
        attributes: [
          'id', 'name', 'capacity', 'telephone', 'description', 'occupation',
          'identifier', 'deleted', 'createdAt', 'updatedAt', 'local_logo',
          [Sequelize.fn('COUNT', Sequelize.col('offers.local_id')), 'offerCount']
        ]
      })
    }
  }
  Local.findLocalGeo = (lat, lng, type, city, offset, limit, activeOffers, maxDistance, full, newOffers, orderArray) => {
    // TODO ADD LIMIT TO THE NUMBER OF LOCALS THAT WILL BE SELECTED FOR THE GEOLOCATION QUERY -> PASS LOCATIONS CITY
    const orderBy = []
    orderArray.forEach(element => {
      if (element[0] === 'DISTANCE') {
        orderBy.push([sequelize.col('distance'), element[1]])
      } else if (element[0] === 'rating') {
        orderBy.push([{
          model: Local.getModel(element[0]),
          as: 'rating'
        }, element[1], element[2]])
      }
    })
    if (orderArray.length === 0) {
      orderBy.push([sequelize.col('distance'), 'ASC'])
    }
    const offerInclude = {
      model: sequelize.models.Offer,
      as: 'offers',
      where: { deleted: false },
      attributes: []
    }
    if (activeOffers === true) {
      offerInclude.require = true
    }
    if (typeof newOffers === typeof 'true' && /^([0-9].)$/.test(newOffers)) {
      offerInclude.where.startDate = { [Op.gt]: new Date(new Date() - (parseInt(newOffers) * 3600000)) }
    }
    const includes = [
      {
        model: sequelize.models.LocalType,
        as: 'localType',
        require: true
      },
      'address',
      'tags',
      'rating',
      offerInclude
    ]
    if (type) {
      includes.push({
        model: sequelize.models.LocalType,
        as: 'localType',
        where: { deleted: false, id: type }
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
    const whereClause = {
      deleted: false
    }
    if (full === 'false') {
      whereClause.capacity = { [Op.gt]: [sequelize.col('Local.occupation')] }
    } else if (full === 'true') {
      whereClause.capacity = { [Op.eq]: [sequelize.col('Local.occupation')] }
    }
    return Local.findAndCountAll({
      attributes: [
        'id',
        'name',
        'capacity',
        'telephone',
        'description',
        'occupation',
        'identifier',
        'deleted',
        'createdAt',
        'updatedAt',
        'local_logo',
        [
          sequelize.literal(
            '6371000 * acos(cos(radians(' +
              lat +
              ')) * cos(radians(lat)) * cos(radians(' +
              lng +
              ') - radians(lng)) + sin(radians(' +
              lat +
              ')) * sin(radians(lat)))'
          ),
          'distance'
        ],
        [Sequelize.fn('COUNT', Sequelize.col('offers.local_id')), 'offerCount']
      ],
      include: includes,
      where: whereClause,
      order: orderBy,
      distinct: true,
      subQuery: false,
      offset: offset,
      limit: parseInt(limit),
      group: ['id', 'offers.local_id']
      //, logging: console.log
    })
  }
  Local.updateData = (id, updateData) => {
    return Local.update(updateData, { where: { id: id } })
  }
  Local.erase = async (id) => {
    const locals = await Local.findAll({ where: { id: id } })
    for (const local of locals) {
      local.destroy()
    }
  }
  Local.list = () => {
    return Local.findAll({
      include: ['offers',
        'localType',
        'address',
        'images',
        'tags',
        'rating']
    })
  }
  Local.findLocalByIdWithPrivateData = (id) => {
    return Local.findOne({
      where: {
        id: id
      },
      include: ['offers', 'localType', 'address', 'images', 'tags', 'rating', 'userFavoriteLocal', 'activity']
    })
  }
  Local.getModel = (model) => {
    if (model === 'rating') {
      return sequelize.models.Rating
    }
  }

  return Local
}
