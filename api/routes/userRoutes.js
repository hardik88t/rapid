import express from "express";

import { verifyToken, verifyAdminRole, verifyUserRole, checkUserMatch } from "../utils/verifyToken.js";
import { test, getUsers, getUserById, updateUserById, deleteUserById, softDeleteUserById, getUserByEmail, getUserByUsername } from '../controllers/userController.js'

const router = express.Router();



router.use('/test', test);
router.get('/getallusers', verifyToken, verifyAdminRole, getUsers);
router.get('/:id', verifyToken, verifyAdminRole, getUserById);
router.get('/email/:email', verifyToken, verifyAdminRole, getUserByEmail);
router.get('/username/:username', verifyToken, verifyAdminRole, getUserByUsername);

// router.post('/create', verifyToken, createUser);
// router.post('/signout', verifyToken, createUser);


// Only accessable if You are ADMIN OR Owner 
router.put('/update/:id', verifyToken, [verifyAdminRole, checkUserMatch], updateUserById);

router.delete('/delete/:id', verifyToken, checkUserMatch, softDeleteUserById);
router.delete('/delete/:id', verifyToken, checkUserMatch, softDeleteUserById);
router.delete('/delete/hard/:id', verifyToken, checkUserMatch, deleteUserById);


export default router;


