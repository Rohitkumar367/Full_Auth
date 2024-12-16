
import express from 'express'
const router = express.Router()

import UserContoller from '../controllers/userController.js'
import checkUserAuth from '../middlewares/auth-middleware.js'

// route leve middleware
router.use('/changepassword', checkUserAuth)

// public routes 
router.post('/register', UserContoller.userRegistration);
router.post('/login', UserContoller.userLogin);

// protected routes
router.post('/changepassword', UserContoller.changeUserPassword);

export default router;
