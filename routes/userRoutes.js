import express from 'express'
const router = express.Router()

import {
    authUser,
    registerUser,
    getUserProfile,
    createUserProfile,
    updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router
    .route('/profile')
    .get(protect, getUserProfile)
    .post(protect, createUserProfile)
    .put(protect, updateUserProfile)

export default router
