import express from 'express';
import {
	registerAdmin,
	registerUser,
	signinAdmin,
	signinUser
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/signin', signinUser);
router.post('/admin/signup', registerAdmin);
router.post('/admin/signin', signinAdmin);

export default router;
