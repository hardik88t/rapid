import express from 'express';


import { verifyToken, verifyAdminRole, verifyUserRole } from "../utils/verifyToken.js";
import { test, createBlog, getBlogs, getBlogById, updateBlogBySlug, updateBlogById, deleteBlogBySlug, deleteBlogById, getPublishedBlogBySlug, getBlogBySlug, getBlogsByAuthorId, getPublishedBlogs, publishBlogBySlug, validateSlug, getBlogsByThisAuthor } from '../controllers/blogController.js'

const router = express.Router();


router.use('/test', test);
router.get('/published', getPublishedBlogs);

router.get('/getblogs', verifyToken, verifyAdminRole, getBlogs)
router.get('/published/:slug', getPublishedBlogBySlug)
router.post('/:status/:slug', verifyToken, verifyAdminRole, publishBlogBySlug)
router.get('/', verifyToken, getBlogsByThisAuthor);
router.get('/:slug', verifyToken, verifyAdminRole, getBlogBySlug)
router.get('/author/:authorId', verifyToken, getBlogsByAuthorId);
router.get('/id/:id', verifyToken, getBlogById);

router.post('/create', verifyToken, createBlog)
router.post('/validate', validateSlug);

// router.put('/update/:id', verifyToken, updateBlogById)
router.put('/update/:slug', verifyToken, updateBlogBySlug)

// router.delete('/delete/:id', verifyToken, deleteBlogById)
router.delete('/deleteblog/:slug', verifyToken, deleteBlogBySlug)


export default router;