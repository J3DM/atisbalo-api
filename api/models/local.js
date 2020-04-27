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
      localtype_id: DataTypes.UUID,
      deleted: DataTypes.BOOLEAN,
      lng: DataTypes.FLOAT,
      lat: DataTypes.FLOAT
    },
    {}
  )
  Local.associate = function (models) {
    // associations can be defined here
  }
  Local.findLocalGeo = (
    lat,
    lng,
    includes,
    where,
    maxDistance,
    offset,
    limit
  ) => {
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
