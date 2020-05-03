module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN
    },
    {}
  )
  Tag.associate = function (models) {
    Tag.hasMany(models.LocalTag, {
      foreignKey: 'tag_id',
      onDelete: 'cascade',
      as: 'localTag'
    })
  }
  return Tag
}
