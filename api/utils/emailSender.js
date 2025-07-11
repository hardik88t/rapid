import User from '../models/userModel.js';
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
        try {
            const users = await User.find();
            await Promise.all(users.map(async (user) => {
                await sendEmail(user.email, 'Daily Notification', 'This is your daily notification');
            }));
        } catch (error) {
            console.error('Error scheduling daily email:', error);
        }
    });
};
