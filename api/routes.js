const express = require('express')
const app = express()
const Multer = require('multer')
const upload = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})
// const multer = require('./middlewares/multer')
/*
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
app.post('/logout', AuthController.logout)
app.post('/token', AuthController.refresh)

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

app.get('/localasociateds', LocalsAsociatedController.getAllLocalsAsociated)
app.get('/localassociateds/:idLocal', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, LocalsAsociatedController.getLocalsAsociateds)
app.get('/localsforassociated', AuthMiddlewares.verifyToken, LocalsAsociatedController.getLocalsForAsociated)
app.post('/localsassociated', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyManager, LocalsAsociatedController.createLocalAsociated)
app.put('/localsassociated/:idLocal/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyOwner, LocalsAsociatedController.updateLocalAsociated)
app.delete('/localsassociated/:idLocal/:id', AuthMiddlewares.verifyToken, LocalPermissionMiddlewares.verifyOwner, LocalsAsociatedController.eraseLocalAsociated)

/*
 LocalController
 */
app.post('/locals', AuthMiddlewares.verifyToken, LocalController.createLocal)
app.get('/locals', LocalController.getLocalsGeo)
app.get('/local/:id', LocalController.getLocalByID)
app.put('/local/:id', LocalController.updateLocal)
app.put('/local/:id/reactivate', LocalController.reactivateLocal)
app.delete('/local/:id', LocalController.removeLocal)
app.delete('/local/:id/erase', LocalController.eraseLocal)

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
app.get('/localtypes', LocalTypeController.getAllLocalTypes)
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
app.get('/offers/:id', OffersController.getLocalOffers)
app.get('/offers/active/:id', OffersController.getActiveLocalOffers)
app.get('/offer/:id', OffersController.getOffer)
app.post('/offer', OffersController.createLocalOffer)
app.put('/offer/:id/reactivate', OffersController.reactivateLocalOffer)
app.put('/offer/:id', OffersController.updateLocalOffer)
app.delete('/offer/:id', OffersController.removeLocalOffer)
app.delete('/offer/:id/erase', OffersController.eraseLocalOffer)

/*
 Ratings
 */
app.get('/ratings', RatingsController.getAllRatings)

/*
 Roles
 */

app.get('/roles', RolesController.getAllRoles)
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

module.exports = app
