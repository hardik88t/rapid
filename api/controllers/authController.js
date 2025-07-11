import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import admin from 'firebase-admin';
// Initialize Firebase Admin SDK with your service account key
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./config/fb_admin_rapid.json', 'utf8'));

import { body, validationResult } from 'express-validator';

import { otpStorage, generateOTP, sendOTP } from '../utils/otpVerification.js';

import User from '../models/userModel.js'
import { errorMessage } from '../utils/errorMessage.js';
// import { verifyToken } from '../utils/verifyToken.js';


const SECRET_KEY = process.env.SECRET_KEY;

export const test = (req, res) => {
    console.log("======= AUTH CONTROLLER TEST =======");
    res.status(200).json('AUTH CONTROLLER TEST');
}

export const getOTP = async (req, res, next) => {
    const { email } = req.body;
    console.log(email)
    if (!email || email === '') {
        console.log(email.yellow)
        return next(errorMessage(400, 'Missing email'));
    }

    try {
        // Generate and save OTP
        const otp = generateOTP();
        otpStorage[email] = otp;

        // Remove OTP after 10 minutes
        setTimeout(() => {
            delete otpStorage[email];
        }, 10 * 60 * 1000); // 10 minutes in milliseconds

        // Send OTP via email
        await sendOTP(email, otp);

        res.status(200).json('OTP sent successfully');
    } catch (error) {
        next(error);
    }
};



export const validateUsername = async (req, res, next) => {
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    const { username } = req.body;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ error: 'Username must only contain letters, numbers, underscores, and dashes.' });
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }
        return res.status(200).json({ message: 'Username available' });
    } catch (error) {
        console.error('Error in validateUsername:', error);
        return next(error);
    }
};


export const register = [
    // Validate fields
    body('username').notEmpty().withMessage('Username is required'),
    body('firstname').notEmpty().withMessage('First name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('otp').notEmpty().withMessage('OTP is required'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, firstname, lastname, email, password, otp } = req.body;

        try {
            // Check if OTP matches
            if (otpStorage[email] !== parseInt(otp)) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            // OTP is valid, remove it from storage
            delete otpStorage[email];

            const passwordHash = bcryptjs.hashSync(password, 10);

            const newUser = new User({
                username,
                firstname,
                lastname,
                email,
                password: passwordHash,
            });

            // Save user to the database
            await newUser.save();

            res.json('Signup successful');
        } catch (error) {
            console.error('Error in register:', error);
            next(error);
        }
    }
];

export const resetPassword = async (req, res, next) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return next(errorMessage(400, 'Missing fields'));
    }

    try {
        const savedOTP = otpStorage[email];
        if (!savedOTP) {
            return next(errorMessage(400, 'OTP expired or invalid'));
        }
        if (savedOTP !== parseInt(otp)) {
            return next(errorMessage(400, 'Invalid OTP'));
        }
        delete otpStorage[email];

        const hashedPassword = bcryptjs.hashSync(newPassword, 10);

        const user = await User.findOne({ email });
        if (!user) {
            return next(errorMessage(404, 'User not found'));
        }

        const passwordHistory = [...user.passwordHistory, user.password];
        await User.updateOne({ email }, {
            password: hashedPassword,
            passwordLastChanged: new Date(),
            passwordHistory
        });

        res.status(200).json('Password reset successful');
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    console.log("---------------------------------")
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorMessage(400, 'Validation failed', errors.array()));
    }

    const { email, username, password } = req.body;

    try {
        let validUser;
        if (email) {
            validUser = await User.findOne({ email });
        } else if (username) {
            validUser = await User.findOne({ username });
        } else {
            return next(errorMessage(400, 'Email or username is required'));
        }

        if (!validUser) {
            return next(errorMessage(404, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorMessage(400, 'Invalid password'));
        }

        const token = jwt.sign(
            {
                id: validUser._id,
                role: validUser.role,
                email: validUser.email,
                username: validUser.username
            },
            process.env.SECRET_KEY,
            { expiresIn: '6h' }
        );

        const { password: pass, passwordLastChanged, passwordHistory, isDeleted, deletedAt, ...rest } = validUser._doc;

        res.status(200)
            .cookie('access_token', token, {
                httpOnly: true,
                secure: true, // Set to true for HTTPS
                expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours expiration
            })
            .json(rest);

    } catch (error) {
        console.error('Error in login:', error);
        next(errorMessage(500, 'Internal server error'));
    }
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const getFirebaseToken = (req, res) => {
    // Get the UID of the user from the request or use a default value
    const uid = req.user?.id || 'VERY_STRONG_SECRET';

    // Set the expiration time to 1 minute from now
    const expirationTime = Math.floor(Date.now() / 1000) + (60 * 5);  //TODO

    // Create a custom token for the user with expiration time
    admin.auth().createCustomToken(uid, { expiresIn: '6h' })
        .then((customToken) => {
            res.status(200).json({ customToken: customToken }); //TODO: add it to cookie
        })
        .catch((error) => {
            console.error('Error creating custom token:', error);
            res.status(500).json({ error: 'Failed to generate Firebase token' });
        });
};



export const signout = (req, res) => {
    console.log('======Logged Out======')
    res.clearCookie('access_token').json({ message: 'Signout successful' });
};
