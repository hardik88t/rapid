import User from '../models/userModel.js';
import { errorMessage } from '../utils/errorMessage.js';
import { validationResult } from 'express-validator';


export const test = (req, res) => {
    console.log('=========== USER CONTROLLER TEST =============');
    res.status(200).json('USER CONTROLLER TEST');
};


// Get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getUsers:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};

// Get a single user by ID
export const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return next(errorMessage(404, 'User not found'));
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserById:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};


export const getThisUser = async (req, res, next) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id)
            .select('username id email firstname lastname profilePicture role isSubscribed isTwoFactorEnabled address phoneNumber socialProfiles passwordLastChanged customFields');
        if (!user) {
            return next(errorMessage(404, 'User not found'));
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getThisUser:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};



// export const getThisUserJWT = async (req, res, next) => {
//     try {
//         res.status(200).json(req.user);
//     } catch (error) {
//         console.error('Error in getUserById:', error);
//         next(errorMessage(500, 'Internal server error'));
//     }
// };


// Update a user by ID
export const updateUserById = async (req, res, next) => {
    const { id } = req.params;
    console.log(`${req.body}`.red, "==================");
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            return next(errorMessage(404, 'User not found'));
        }
        res.status(200);
    } catch (error) {
        console.error('Error in updateUserById:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};

// Delete a user by ID
export const deleteUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return next(errorMessage(404, 'User not found'));
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error in deleteUserById:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};

// Delete a user by ID
export const softDeleteUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() });
        if (!user) {
            return next(errorMessage(404, 'User not found'));
        }
        res.status(200).json({ message: 'User soft deleted successfully' });
    } catch (error) {
        console.error('Error in deleteUserById:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};


// Get a user by email
export const getUserByEmail = async (req, res, next) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorMessage(404, 'User not found'));
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserByEmail:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};

// Get a user by username
export const getUserByUsername = async (req, res, next) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return next(errorMessage(404, 'User not found'));
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserByUsername:', error);
        next(errorMessage(500, 'Internal server error'));
    }
};
