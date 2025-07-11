import mongoose from "mongoose";

const userModelSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z0-9_-]*$/.test(v);
                },
                message: props => `${props.value} is not a valid username!`
            }
        },
        // authorname: {
        //     type: String,
        //     default: function () {
        //         return this.username;
        //     },
        //     required: true,
        // },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^\S+@\S+\.\S+$/,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        },
        role: {
            type: String,
            enum: ['admin', 'user', 'guest'],
            default: 'admin',
        },
        // Subscribed to email notification
        isSubscribed: {
            type: Boolean,
            default: true,
        },
        isTwoFactorEnabled: {
            type: Boolean,
            default: false,
        },
        address: {
            type: {
                street: String,
                city: String,
                state: String,
                postalCode: String,
            },
            default: null,
        },
        phoneNumber: {
            type: String,
            default: "9900990099",
        },
        socialProfiles: {
            type: [String],
            default: [],
        },
        // activityLog: {
        //     type: [Object],
        //     default: [],
        // },
        passwordLastChanged: {
            type: Date,
            default: null,
        },
        passwordHistory: {
            type: [String],
            default: [],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
        customFields: {
            type: Object,
            default: {},
        }
    },
    {
        timestamps: true,
    }
);


const UserModel = mongoose.model('UserModel', userModelSchema)

export default UserModel;
