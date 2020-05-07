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
  Tag.List = () => {
    return Tag.findAll({
      where: { deleted: false }
    })
  }
  Tag.create = (newTag) => {
    return Tag.build(newTag).save()
  }
  Tag.updateData = (id, updateDoc) => {
    return Tag.update(updateDoc, { where: { id: id } })
  }
  Tag.remove = (id) => {
    return Tag.update({ deleted: true }, { where: { id: id } })
  }
  Tag.erase = (id) => {
    return Tag.destroy({
      where: { id: id }
    })
  }
  Tag.findById = (id) => {
    return Tag.findOne({ where: { id: id } })
  }
  Tag.findByName = (name) => {
    return Tag.findOne({ where: { name: name } })
  }
  return Tag
}
