import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    type: {
        type: String,
        // required: true
    },
    caption: {
        type: String,
        default: ""
    },
    post: {
        type: String,
        default: ""
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
},
    {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        timestamps: true
    }
)

export default mongoose.model("post", postSchema);