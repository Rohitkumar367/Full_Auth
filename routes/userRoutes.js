
import express from 'express'
const router = express.Router()

import UserContoller from '../controllers/userController.js'

// public routes 
router.post('/register', UserContoller.userRegistration);
router.post('/login', UserContoller.userLogin);


// protected routes

export default router;
