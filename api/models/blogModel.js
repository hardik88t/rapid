import mongoose from "mongoose";
import UserModel from './userModel.js';


const blogModelSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        content: {
            type: [{
                type: Object,
                required: true
            }],
            required: true,
        },
        status: {
            type: String,
            enum: ["Draft", "Scheduled", "Published"],
            default: "Draft",
        },
        attachments: {
            type: [],
            default: [],
        },
        publishDate: {
            type: Date,
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserModel,
            immutable: true
        },
        showAuthor: {
            type: Boolean,
            default: false,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        modificationDate: {
            type: Date,
            default: null,
        },
        modifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserModel,
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


const BlogModel = mongoose.model('blogModel', blogModelSchema)

export default BlogModel;














// tags: {
//     type: [String],
//     default: [],
// },
// views: {
//     type: Number,
//     default: 0,
// },
// likes: {
//     type: Number,
//     default: 0,
// },
// comments: {
//     type: [{
//         text: String,
//         commenterName: String,
//         commentDate: { type: Date, default: Date.now }
//     }],
//     default: [],
// },
// featuredImage: {
//     type: String,
//     default: 'https://example.com/default-image.jpg',
// },
