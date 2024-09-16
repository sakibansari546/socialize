import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
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
        ref: "user",
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
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