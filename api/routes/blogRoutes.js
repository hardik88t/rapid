import express from 'express';


import { verifyToken, verifyAdminRole, verifyUserRole } from "../utils/verifyToken.js";
import { test, createBlog, getBlogs, getBlogById, updateBlogById, deleteBlogById, getBlogBySlug, getBlogsByAuthorId, getPublishedBlogs } from '../controllers/blogController.js'

const router = express.Router();


router.use('/test', test);
router.get('/published', getPublishedBlogs);

router.get('/getblogs', verifyToken, verifyAdminRole, getBlogs)
router.get('/:slug', verifyToken, verifyAdminRole, getBlogBySlug)
router.get('/author/:authorId', verifyToken, getBlogsByAuthorId);
router.get('/id/:id', verifyToken, getBlogById);

router.post('/create', verifyToken, createBlog)

router.put('/update/:id', verifyToken, updateBlogById)

router.delete('/delete/:id', verifyToken, deleteBlogById)


export default router;