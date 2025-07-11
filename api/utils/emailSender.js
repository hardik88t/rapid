import User from '../models/userModel.js';
import Blog from '../models/blogModel.js'
import nodemailer from 'nodemailer';
import cron from 'node-cron';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


export const sendEmail = async (to, subject, htmlContent) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: htmlContent,
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


export const scheduleDailyEmail = (scheduledTime = '0 8 * * *') => {
    cron.schedule(scheduledTime, async () => {
        console.log('CRON EMAIL PUBLISH', new Date());

        try {
            const currentTime = new Date();
            const futureTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

            const blogsToPublish = await Blog.find({
                status: 'Scheduled',
                publishDate: { $lt: futureTime }
            }).populate('author', 'email');

            const blogsByAuthor = blogsToPublish.reduce((acc, blog) => {
                const authorId = blog.author._id.toString();
                if (!acc[authorId]) {
                    acc[authorId] = {
                        email: blog.author.email,
                        blogs: [],
                    };
                }
                acc[authorId].blogs.push(blog.title);
                return acc;
            }, {});

            await Promise.all(Object.values(blogsByAuthor).map(async (authorData) => {
                const { email, blogs } = authorData;
                await sendEmail(email, 'Blog Scheduled for Publishing', `Your blogs ${blogs.join(', ')} are scheduled for publishing within the next 24 hours.`);
            }));
        } catch (error) {
            console.error('Error scheduling daily email:', error);
        }
    });
};


export const publishScheduledBlogs = async () => {
    console.log('SCHEDULED BLOGS PUBLISHED', new Date());
    try {
        const currentTime = new Date();
        const blogsToUpdate = await Blog.find({
            status: 'Scheduled',
            publishDate: { $lt: currentTime },
        });

        if (blogsToUpdate.length > 0) {
            await Promise.all(
                blogsToUpdate.map(async (blog) => {
                    blog.status = 'Published';
                    await blog.save();
                })
            );

            console.log('Updated blogs:', blogsToUpdate);
        } else {
            console.log('No blogs to update');
        }
    } catch (err) {
        console.error('Error updating blogs:', err);
    }
}

export const schedulePublish = (scheduledTime = '*/10 * * * *') => {
    cron.schedule(scheduledTime, publishScheduledBlogs);
};
