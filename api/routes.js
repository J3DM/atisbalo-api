const express = require('express')
const app = express()
/*
const Multer = require('multer')

const upload = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})
// const multer = require('./middlewares/multer')

 Import Middlewares
 */

// const { verifyToken, verifyTokenEmail } = require('./middlewares/auth')

/*
 Import Controllers
 */

const AddressesController = require('./controllers/addressesController')
const CommentsController = require('./controllers/commentsController')
const DocumentsController = require('./controllers/documentsController')
const LocalDocumentsController = require('./controllers/localDocumentsController')
const LocalImagesController = require('./controllers/localImagesController')
const LocalOwnsController = require('./controllers/localOwnController')
const LocalsAsociatedController = require('./controllers/localsAsociatedController')
const LocalController = require('./controllers/localsController')
const LocalTagsController = require('./controllers/localTagsController')
const LocalTypeController = require('./controllers/localTypesController')
const OfferImagesController = require('./controllers/offerImagesController')
const OffersController = require('./controllers/offersController')
const RatingsController = require('./controllers/ratingsController')
const RolesController = require('./controllers/rolesController')
const TagsController = require('./controllers/tagsController')
const UsersController = require('./controllers/usersController')
const UsersFavoriteLocalsController = require('./controllers/usersFavoriteLocalsController')
const AuthController = require('./controllers/authController')
const AuthMiddlewares = require('./middlewares/auth')
const LocalPermissionMiddlewares = require('./middlewares/permissions')
const OrderByMiddleware = require('./middlewares/orderByParams')
const LocalActivityMiddleware = require('./middlewares/localActivity')
const AtisbalitosMiddleware = require('./middlewares/atisbalitos')
const LocalActivityController = require('./controllers/localActivityController')
/*
Auth
*/
app.get(
  '/verify/:token',
  AuthMiddlewares.verifyTokenParam,
  AuthController.verifyUserEmail
)
app.post('/recovery/password', AuthController.recoveryPassword)
app.post('/register', AuthController.register)
app.post('/login', AuthController.login)
app.post('/logout', AuthMiddlewares.verifyToken, AuthController.logout)
app.post('/token', AuthMiddlewares.verifyToken, AuthController.refresh)

/*
 Addresses
 */

app.get('/addresses', AddressesController.getAllAddresses)
app.post('/addresses', AddressesController.createAddress)
app.put('/address/:id', AddressesController.updateAddress)

/*
 Comments
 */

app.get('/comments', CommentsController.getAllComments)
app.get('/comments/local/:idLocal', CommentsController.getLocalComments)
app.get('/comment/:id', CommentsController.getComment)
app.post(
  '/comment/:idLocal',
  AuthMiddlewares.verifyToken,
  CommentsController.createComment
)
app.put(
  '/comment/:id',
  AuthMiddlewares.verifyToken,
  CommentsController.updateComment
)
app.put(
  '/comment/:id/reactivate',
  AuthMiddlewares.verifyToken,
  CommentsController.ractivateComment
)
app.delete(
  '/comment/:id',
  AuthMiddlewares.verifyToken,
  CommentsController.removeComment
)
app.delete(
  '/comment/:id/erase',
  AuthMiddlewares.verifyToken,
  CommentsController.eraseComment
)

/*
 Documents
 */

app.get('/documents', DocumentsController.getAllDocuments)

/*
 LocalDocuments
 */

app.get('/localdocuments', LocalDocumentsController.getAllLocalDocuments)
app.get('/localdocument/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyOwner, LocalDocumentsController.getDocument)

/*
 LocalImages
 */
app.get('/localimages', LocalImagesController.getAllLocalImages)

/*
 LocalOwns
 */

app.get('/localowns', LocalOwnsController.getAllLocalOwns)

/*
 LocalsAsociated
 */

app.get('/localassociateds/:idLocal', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, LocalsAsociatedController.getLocalsAsociateds)
app.get('/localassociateds', LocalsAsociatedController.getAllLocalsAsociated)
app.get('/localsforassociated', AuthMiddlewares.verifyToken, LocalsAsociatedController.getLocalsForAsociated)
app.post('/localsassociated', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, LocalsAsociatedController.createLocalAsociated, LocalActivityMiddleware.addLocalActivity, LocalActivityMiddleware.addLocalActivity)
app.put('/localsassociated', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyOwner, LocalsAsociatedController.updateLocalAsociated, LocalActivityMiddleware.addLocalActivity, LocalActivityMiddleware.addLocalActivity)
app.delete('/localsassociated/:idLocal/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyOwner, LocalsAsociatedController.eraseLocalAsociated, LocalActivityMiddleware.addLocalActivity, LocalActivityMiddleware.addLocalActivity)

/*
 LocalController
 */
app.get('/listLocals', LocalController.listLocals)
app.post('/locals', AuthMiddlewares.verifyToken, LocalController.createLocal, LocalActivityMiddleware.addLocalActivity)
app.get('/locals', OrderByMiddleware.getGeoLocationOrderByParameters, LocalController.getLocalsGeo)
app.get('/local/private/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyEmployee, LocalController.getLocalPrivateData)
app.get('/local/:id', LocalController.getLocalByID)
app.put('/local/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyOwner, LocalController.updateLocal, LocalActivityMiddleware.addLocalActivity)
app.put('/local/:id/reactivate', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyOwner, LocalController.reactivateLocal, LocalActivityMiddleware.addLocalActivity)
app.delete('/local/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyOwner, LocalController.removeLocal, LocalActivityMiddleware.addLocalActivity)
app.delete('/local/:id/erase', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyOwner, LocalController.eraseLocal)
app.post('/local/occupation/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyEmployee, LocalController.addOccupation, LocalActivityMiddleware.addLocalActivity)
app.delete('/local/occupation/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyEmployee, LocalController.removeOccupation, LocalActivityMiddleware.addLocalActivity)
app.put('/local/status/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, LocalController.openClose, LocalActivityMiddleware.addLocalActivity)

/*
 LocalTags
 */
app.get('/localtags', LocalTagsController.getAllLocalTags)
app.get('/localtags/:id', LocalTagsController.getLocalTags)
app.post('/localtags/:id', LocalTagsController.createLocalTags)
app.put('/localtags/:id', LocalTagsController.updateLocalTags)

/*
 LocalType
 */
app.post('/localtype', LocalTypeController.createLocalType)
app.get('/localtypes/list', LocalTypeController.getAllLocalTypes)
app.get('/localtypes', LocalTypeController.getLocalTypes)
app.get('/localtypes/active', LocalTypeController.getActiveLocalTypes)
app.get('/localtype/:id', LocalTypeController.getLocalType)
app.put('/localtype/:id', LocalTypeController.updateLocalType)
app.put('/localtype/:id/reactivate', LocalTypeController.reactivateLocalType)
app.delete('/localtype/:id', LocalTypeController.removeLocalType)
app.delete('/localtype/:id/erase', LocalTypeController.eraseLocalType)

/*
 OfferImages
 */

app.get('/offerimages', OfferImagesController.getAllOfferImages)

/*
 Offers
 */

app.get('/offers', OffersController.getAllOffers)
app.get('/offers/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, OffersController.getLocalOffers)
app.get('/offers/active/:id', OffersController.getActiveLocalOffers)
app.get('/offer/:id', OffersController.getOffer)
app.post('/offer', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, OffersController.createLocalOffer, LocalActivityMiddleware.addLocalActivity)
app.put('/offer/:id/reactivate', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, OffersController.reactivateLocalOffer, LocalActivityMiddleware.addLocalActivity)
app.put('/offer/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, OffersController.updateLocalOffer, LocalActivityMiddleware.addLocalActivity)
app.delete('/offer/:id/:idLocal', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, OffersController.removeLocalOffer, LocalActivityMiddleware.addLocalActivity)
app.delete('/offer/:id/:idLocal/erase', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, OffersController.eraseLocalOffer, LocalActivityMiddleware.addLocalActivity)

/*
 Ratings
 */
app.get('/ratings', RatingsController.getAllRatings)

/*
 Roles
 */

app.get('/roles/list', RolesController.getAllRoles)
app.get('/roles', RolesController.getRoles)
app.get('/role/:id', RolesController.getRole)
app.post('/role', RolesController.createRole)
app.put('/role/:id', RolesController.updateRole)
app.put('/role/:id/reactivate', RolesController.activateRole)
app.delete('/role/:id', RolesController.removeRole)
app.delete('/role/:id/erase', RolesController.eraseRole)

/*
 Tags
 */

app.get('/tags', TagsController.getAllTags)
app.get('/tag/:id', TagsController.getTag)
app.post('/tag', TagsController.createTag)
app.put('/tag/:id', TagsController.updateTag)
app.delete('/tag/:id/erase', TagsController.eraseTag)
app.delete('/tag/:id', TagsController.deleteTag)
app.put('/tag/:id/reactivate', TagsController.activateTag)

/*
 Users
 */
app.get('/users', UsersController.getAllUsers)
app.post('/user/invited/:idUser/local/:localId', LocalPermissionMiddlewares.verifyInviterIsManager, UsersController.createUserWithPermissions, LocalActivityMiddleware.addLocalActivity)
app.post('/user', UsersController.createUser)
app.put('/user', AuthMiddlewares.verifyToken, UsersController.updateUser)
app.put(
  '/user/email',
  AuthMiddlewares.verifyToken,
  UsersController.changeEmailUser
)
app.put(
  '/user/password',
  AuthMiddlewares.verifyToken,
  UsersController.changePasswordUser
)
app.get(
  '/user/validate',
  AuthMiddlewares.verifyToken,
  UsersController.verifyUser
)
app.delete('/user', AuthMiddlewares.verifyToken, UsersController.deleteUser)
app.delete(
  '/user/erase',
  AuthMiddlewares.verifyToken,
  UsersController.eraseUser
)
app.get('/user', AuthMiddlewares.verifyToken, UsersController.findUserById)
app.put('/user/recover', AuthMiddlewares.verifyToken, UsersController.recoverUser)

/*
 UsersFavoriteLocals
 */
app.get(
  '/userfavoritelocals',
  UsersFavoriteLocalsController.getAllUserFavoriteLocals
)
app.get(
  '/user/favoriteLocals',
  AuthMiddlewares.verifyToken,
  UsersFavoriteLocalsController.getUserFavoriteLocals
)
app.post(
  '/user/favoriteLocals/:localId',
  AuthMiddlewares.verifyToken,
  UsersFavoriteLocalsController.addToFavoriteLocal
)
app.delete(
  '/user/favoriteLocals/:localId',
  AuthMiddlewares.verifyToken,
  UsersFavoriteLocalsController.removeFromFavoriteLocal
)
app.get(
  '/user/favoriteLocals/offers',
  AuthMiddlewares.verifyToken,
  UsersFavoriteLocalsController.getUserFavoriteLocalsOffers
)

/*
Purchase and expend atisbalitos
*/
app.post('/purchase/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, LocalDocumentsController.purchase, LocalActivityMiddleware.addLocalActivity)
app.post('/expend/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, AtisbalitosMiddleware.hasEnoughtCurrency, LocalDocumentsController.expend, LocalActivityMiddleware.addLocalActivity)

/*
Check localActivity
*/
app.get('/localActivity/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyEmployee, LocalActivityController.getLocalActivity)

module.exports = app
