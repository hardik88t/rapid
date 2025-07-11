import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
// import chalk from 'chalk';
import colors from 'colors';
import cron from 'node-cron';

import { logRequestDetails } from './utils/logger.js';
import { connectToMongoDB } from './utils/mongoose.js';
import { scheduleDailyEmail } from './utils/emailSender.js';

import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';

import cookieParser from 'cookie-parser';


connectToMongoDB(process.env.MONGO);

const app = express();


// Middlewares
if (process.env.NODE_ENV !== 'production') {
    // app.use(morgan('combined'))
    app.use(morgan('dev'));
    app.use(logRequestDetails);
}

// app.use(express.static('public'));
app.use(express.json(), (req, res, next) => {
    console.log(req.body);
    next();
});
app.use(cookieParser());


// Route Handler
const ROOT = '/api'
// const ROOT = ''
app.use(`${ROOT}/auth`, authRoutes);
app.use(`${ROOT}/user`, userRoutes);
app.use(`${ROOT}/blog`, blogRoutes)


// Catch-all route for handling 404 errors
app.use((req, res) => {
    console.log("404 PAGE NOT FOUND".bold.yellow);
    res.status(404).json({ message: 'Page not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).json({ message: 'Something went wrong' }); // Send a generic error message
});


scheduleDailyEmail('0 8 * * *');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server Started====================='.bold.blue);
    console.log(`http://localhost:${process.env.PORT}`.bold.blue);
})
