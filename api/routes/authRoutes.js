import express from 'express';
import { test, register, login, signout, getOTP, resetPassword, validateUsername, getFirebaseToken } from '../controllers/authController.js';
import { verifyToken } from "../utils/verifyToken.js";


const router = express.Router();


router.use('/test', test);
router.get('/validate', validateUsername);
router.get('/getfbtoken', verifyToken, getFirebaseToken)

router.post('/sendotp', getOTP);
router.post('/reset', resetPassword);
router.post('/register', register);
router.post('/login', login);
router.post('/signout', verifyToken, signout)

export default router;