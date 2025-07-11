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
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Draft", "Scheduled", "Published", "Deleted"],
            default: "Draft",
        },
        attachments: {
            type: [String],
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
            ref: 'UserModel',
            immutable: true
        },
        showAuthor: {
            type: Boolean,
            default: true,
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
            ref: 'UserModel',
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

// Define the renderBlog method
blogModelSchema.methods.renderBlog = async function () {
    await this.populate('author').execPopulate();
    const authorName = this.author.username; // Assuming username is the field you want to use
    return {
        title: this.title,
        subtitle: this.subtitle,
        content: this.content,
        attachments: this.attachments,
        publishDate: this.publishDate,
        author: authorName,
    };
};

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
