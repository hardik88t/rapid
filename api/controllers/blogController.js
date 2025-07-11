import { body, param, validationResult } from 'express-validator';
import Blog from '../models/blogModel.js';
import { errorMessage } from '../utils/errorMessage.js';

export const test = (req, res) => {
    console.log("============== BLOG CONTROLLER TEST ==============");
    res.status(200).json('BLOG CONTROLLER TEST');
};


export const createBlog = [
    body('title').notEmpty().withMessage('Title is required'),
    body('subtitle').notEmpty().withMessage('Subtitle is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('slug').notEmpty().withMessage('Slug is required'),
    body('status').optional().notEmpty().withMessage('Status is required').isIn(["Draft", "Scheduled", "Published"]).withMessage('Invalid status'),
    body('attachments').optional().isArray().withMessage('Attachments must be an array'),
    body('publishDate').optional().custom((value, { req }) => {
        if (value === null) return true; // Allow null values
        return typeof Date;
    }).withMessage('Invalid publish date format'),
    body('showAuthor').optional().isBoolean().withMessage('ShowAuthor must be a boolean'),
    body('customFields').optional().isObject().withMessage('CustomFields must be an object'),

    async (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { title, subtitle, content, slug, status, attachments, publishDate, showAuthor, customFields } = req.body;
        const author = req.user.id;
        // if (req.body.publishDate === null) {
        //     status = "Draft"
        // }
        try {
            const newBlog = new Blog({
                title,
                subtitle,
                content,
                slug,
                status,
                attachments,
                publishDate,
                showAuthor,
                customFields,
                author,
                createdAt: new Date(), // Set createdAt to current time
            });

            await newBlog.save();
            res.status(201).json(newBlog);
        } catch (error) {
            console.error('Error in createBlog:', error);
            next(errorMessage(500, 'Internal server error'));
        }
    }
];


export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate('author', 'username').populate('modifiedBy', 'username');
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error in getBlogs:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};

export const getBlogById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return next(errorMessage(404, 'Blog post not found'));
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error in getBlogById:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};

export const updateBlogBySlug = [
    param('slug').notEmpty().withMessage('Slug is required').isString().withMessage('Slug must be a string'),
    body('_id').notEmpty().withMessage('Blog ID is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('subtitle').notEmpty().withMessage('Subtitle is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('status').notEmpty().withMessage('Status is required').isIn(["Draft", "Scheduled", "Published", "Deleted"]).withMessage('Invalid status'),
    body('attachments').isArray().withMessage('Attachments must be an array'),
    body('publishDate').optional().custom((value, { req }) => {
        if (value === null) return true; // Allow null values
        return typeof Date;
    }).withMessage('Invalid publish date format'),
    body('showAuthor').optional().isBoolean().withMessage('ShowAuthor must be a boolean'),
    body('slug').notEmpty().withMessage('Slug is required').isString().withMessage('Slug must be a string'),
    body('customFields').optional().isObject().withMessage('CustomFields must be an object'),

    async (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { slug } = req.params;
        if (req.body.publishDate !== null) {
            req.body.status = "Scheduled"
        }

        try {

            const updateData = {
                ...req.body,
                modificationDate: new Date(),
                modifiedBy: req.user.id
            };
            const blog = await Blog.findOneAndUpdate({ slug }, updateData, { new: true });
            if (!blog) {
                return next(errorMessage(404, 'Blog post not found or already deleted'));
            }
            res.status(200).json(blog);
        } catch (error) {
            console.error('Error in updateBlogBySlug:', error);
            next(errorMessage(500, 'Internal server error'));
        }
    }
];




export const updateBlogById = [
    param('id').notEmpty().withMessage('Blog ID is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('subtitle').notEmpty().withMessage('Subtitle is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('status').notEmpty().withMessage('Status is required').isIn(["Draft", "Scheduled", "Published", "Deleted"]).withMessage('Invalid status'),
    body('attachments').isArray().withMessage('Attachments must be an array'),
    body('publishDate').optional().custom((value, { req }) => {
        if (value === null) return true; // Allow null values
        return typeof Date;
    }).withMessage('Invalid publish date format'),
    body('showAuthor').optional().isBoolean().withMessage('ShowAuthor must be a boolean'),
    body('slug').notEmpty().withMessage('Slug is required').isString().withMessage('Slug must be a string'),
    body('customFields').optional().isObject().withMessage('CustomFields must be an object'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        if (req.body.publishDate === null) {
            req.body.status = "Draft"
        }
        // if (req.body.publishDate !== null) {
        //     req.body.status = "Scheduled"
        // }


        try {
            const updateData = {
                ...req.body,
                modificationDate: new Date(),
                modifiedBy: req.user.id
            };
            const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
            if (!blog) {
                return next(errorMessage(404, 'Blog post not found or already deleted'));
            }
            res.status(200).json(blog);
        } catch (error) {
            console.error('Error in updateBlogById:', error);
            next(errorMessage(500, 'Internal server error'));
        }
    }
];


export const deleteBlogById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return next(errorMessage(404, 'Blog post not found'));
        }
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error in deleteBlogById:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};

export const deleteBlogBySlug = async (req, res, next) => {
    const { slug } = req.params;
    console.log(slug)

    try {
        // Find and delete the blog with the specified slug
        // TODO: Also Delete content/attachment from Firebase
        const deletedBlog = await Blog.findOneAndDelete({ slug });

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete blog', error: error.message });
    }
};



// Get a blog post by slug
export const getBlogBySlug = async (req, res, next) => {
    console.log("GET BY SLUG", req.params)
    const { slug } = req.params;
    try {
        const blog = await Blog.findOne({ slug }).populate('author', 'username');

        if (!blog) {
            return next(errorMessage(404, 'Blog post not found'));
        }
        console.log(blog._id.getTimestamp());
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error in getBlogBySlug:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};


export const validateSlug = async (req, res, next) => {
    const { slug } = req.body;

    try {
        const existingBlog = await Blog.findOne({ slug });

        if (existingBlog) {
            return res.status(200).json({ error: 'URL in use' });
        }

        return res.status(200).json({ message: 'URL is available' });
    } catch (error) {
        console.error('Error in validateSlug:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get published blog by slug
export const getPublishedBlogBySlug = async (req, res, next) => {
    const { slug } = req.params;
    try {
        const blog = await Blog.findOne({ slug })
            .populate('author', 'username')
            .select('title slug subtitle content author showAuthor attachments modificationDate publishDate');

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Filter out the author field if showAuthor is false
        const filteredBlog = {
            ...blog._doc,
            author: blog.showAuthor ? blog.author : undefined
        };

        res.status(200).json(filteredBlog);
    } catch (error) {
        console.error('Error in getPublishedBlogBySlug:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};


// Publish a blog post by slug
export const publishBlogBySlug = async (req, res, next) => {
    const { status, slug } = req.params;
    const statusMap = {
        publish: { status: 'Published', publishDate: new Date() },
        schedule: { status: 'Scheduled', publishDate: new Date() },
        draft: { status: 'Draft', publishDate: null },
    };
    try {
        let blog = await Blog.findOne({ slug });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if the current status is already the same as the desired status
        if (blog.status === statusMap[status].status) {
            return res.status(200).json({ message: `Blog '${slug}' is already '${statusMap[status].status}'` });
        }

        // Update the blog status only if it's different
        blog = await Blog.findOneAndUpdate(
            { slug },
            { $set: statusMap[status] },
            { new: true }
        );

        res.status(200).json({ message: `Blog '${slug}' is now '${statusMap[status].status}'`, blog });
    } catch (error) {
        console.error('Error in publishBlogBySlug:', error);
        next(errorMessage(500, 'Failed to update blog status'));
    }
};



// Get blog posts by author ID
export const getBlogsByAuthorId = async (req, res, next) => {
    const { authorId } = req.params;
    try {
        const blogs = await Blog.find({ author: authorId });
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error in getBlogByAuthorId:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};


export const getBlogsByThisAuthor = async (req, res, next) => {
    const authorId = req.user.id;
    try {
        const blogs = await Blog.find({ author: authorId }).populate('author', 'username').populate('modifiedBy', 'username');
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error in getBlogByAuthorId:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};

// Get published blogs
export const getPublishedBlogs = async (req, res, next) => {
    try {
        const publishedBlogs = await Blog.find({ status: 'Published' })
            .populate('author', 'username')
            .select('title slug author modificationDate publishDate showAuthor');

        // Filter out the author field if showAuthor is false
        const filteredBlogs = publishedBlogs.map(blog => ({
            ...blog._doc,
            author: blog.showAuthor ? blog.author : undefined
        }));

        res.status(200).json(filteredBlogs);
    } catch (error) {
        console.error('Error in getPublishedBlogs:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};


// Get blogs to be published today
export const getBlogsToBePublishedToday = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const blogs = await Blog.find({ publishDate: today });
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error in getBlogsToBePublishedToday:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};


// Get notification data (selecting specific fields)
export const getNotificationData = async (req, res, next) => {
    try {
        const notificationData = await Blog.find({}, 'title subtitle publishDate slug');
        res.status(200).json(notificationData);
    } catch (error) {
        console.error('Error in getNotificationData:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};

// Get blogs to be published today with notification data
export const getBlogsToBePublishedTodayWithNotificationData = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const blogs = await Blog.find({ publishDate: { $gte: today, $lt: new Date(today.getTime() + 86400000) } }, 'title subtitle publishDate slug');
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error in getBlogsToBePublishedTodayWithNotificationData:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};
