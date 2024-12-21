
import UserController from '../controllers/userController.js'
import checkUserAuth from '../middlewares/auth-middleware.js'
import express from 'express'
const router = express.Router()


// route level middleware
router.use('/changepassword', checkUserAuth)


// public routes 
router.post('/register', UserController.userRegistration);
router.post('/login', UserController.userLogin);


// protected routes
router.post('/changepassword', UserController.changeUserPassword);

export default router;
