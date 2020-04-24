const Sequelize = require('sequelize')
const {
  DATABASE_NAME,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT
} = require('../config/constants')

const UserModel = require('./models/user')
const LocalModel = require('./models/local')
const LocalTypeModel = require('./models/localtype')
const RolModel = require('./models/rol')
const TagModel = require('./models/tag')
const LocalTagModel = require('./models/localtag')
const LocalAsociatedModel = require('./models/localasociated')
const UserFauvoriteLocalModel = require('./models/userfauvoritelocal')
const CommentModel = require('./models/comment')
const LocalOwnModel = require('./models/localown')
const LocalDocumentsModel = require('./models/localdocuments')
const AddressModel = require('./models/address')
const DocumentModel = require('./models/document')
const LocalImageModel = require('./models/localimage')
const OfferModel = require('./models/offer')
const OfferImageModel = require('./models/offerimage')
const RatingModel = require('./models/rating')

// DATABASE CONNECTION
const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// MODELS
const User = UserModel(sequelize, Sequelize)
const Local = LocalModel(sequelize, Sequelize)
const LocalType = LocalTypeModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)
const Rol = RolModel(sequelize, Sequelize)
const LocalTag = LocalTagModel(sequelize, Sequelize)
const LocalAsociated = LocalAsociatedModel(sequelize, Sequelize)
const UserFauvoriteLocal = UserFauvoriteLocalModel(sequelize, Sequelize)
const Comment = CommentModel(sequelize, Sequelize)
const LocalOwn = LocalOwnModel(sequelize, Sequelize)
const LocalDocuments = LocalDocumentsModel(sequelize, Sequelize)
const Address = AddressModel(sequelize, Sequelize)
const Document = DocumentModel(sequelize, Sequelize)
const LocalImage = LocalImageModel(sequelize, Sequelize)
const Offer = OfferModel(sequelize, Sequelize)
const OfferImage = OfferImageModel(sequelize, Sequelize)
const Rating = RatingModel(sequelize, Sequelize)

/*

ASSOCIATIONS

*/

// Local
Local.hasMany(Comment, { foreignKey: 'local_id', onDelete: 'cascade' })
Local.hasMany(UserFauvoriteLocal, {
  foreignKey: 'local_id',
  onDelete: 'cascade'
})
Local.hasMany(LocalAsociated, { foreignKey: 'local_id', onDelete: 'cascade' })
Local.hasOne(LocalOwn, { foreignKey: 'local_id', onDelete: 'cascade' })
Local.hasOne(LocalDocuments, { foreignKey: 'local_id', onDelete: 'cascade' })
Local.hasOne(Rating, { foreignKey: 'local_id', onDelete: 'cascade' })
Local.hasOne(Address, { foreignKey: 'local_id', onDelete: 'cascade' })
Local.hasMany(Offer, { foreignKey: 'local_id', onDelete: 'cascade' })
Local.hasMany(LocalImage, { foreignKey: 'local_id', onDelete: 'cascade' })
Local.hasMany(LocalTag, { foreignKey: 'local_id', onDelete: 'cascade' })
Local.belongsTo(LocalType, { foreignKey: 'localType_id' })

// User
User.hasMany(Comment, { foreignKey: 'user_id', onDelete: 'cascade' })
User.hasMany(UserFauvoriteLocal, { foreignKey: 'user_id', onDelete: 'cascade' })
User.hasMany(LocalAsociated, { foreignKey: 'user_id', onDelete: 'cascade' })

// LocalType
LocalType.hasMany(Local, { foreignKey: 'localType_id' })

// LocalAsociated
LocalAsociated.belongsTo(Local, { foreignKey: 'local_id' })
LocalAsociated.belongsTo(User, { foreignKey: 'user_id' })

// TAG
Tag.hasMany(LocalTag, { foreignKey: 'tag_id', onDelete: 'cascade' })

// LocalTag
LocalTag.belongsTo(Tag, { foreignKey: 'tag_id' })

// Offer
Offer.hasMany(OfferImage, { foreignKey: 'offer_id', onDelete: 'cascade' })
Offer.belongsTo(Local, { foreignKey: 'local_id' })

// OferImage
OfferImage.belongsTo(Offer, { foreignKey: 'offer_id' })

// LocalImage
LocalImage.belongsTo(Local, { foreignKey: 'local_id' })

// Comment
Comment.belongsTo(User, { foreignKey: 'user_id' })
Comment.belongsTo(Local, { foreignKey: 'local_id' })

// UserauvoriteLocal
UserFauvoriteLocal.belongsTo(Local, { foreignKey: 'local_id' })
UserFauvoriteLocal.belongsTo(User, { foreignKey: 'user_id' })

// LocalDocuments
LocalDocuments.hasMany(Document, {
  foreignKey: 'localDocument_id',
  onDelete: 'cascade'
})
LocalDocuments.belongsTo(Local, { foreignKey: 'local_id' })

// Document
Document.belongsTo(LocalDocuments, { foreignKey: 'localDocument_id' })

// LocalOwn
LocalOwn.belongsTo(Local, { foreignKey: 'local_id' })

// Rating
Rating.belongsTo(Local, { foreignKey: 'local_id' })

// Address
Address.belongsTo(Local, { foreignKey: 'local_id' })

// LocalTag
LocalTag.belongsTo(Local, { foreignKey: 'local_id' })

module.exports = {
  User,
  Local,
  LocalType,
  Tag,
  Rol,
  LocalTag,
  LocalAsociated,
  UserFauvoriteLocal,
  Comment,
  LocalOwn,
  LocalDocuments,
  Address,
  Document,
  LocalImage,
  Offer,
  OfferImage,
  Rating,
  sequelize
}
