import mongoose, { Schema } from 'mongoose'

let profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
let profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [3, 'Username must be 3 letters long'],
        unique: true,
    },
    fullname: {
        type: String,
        default: "Full Name",
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: String,
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    bio: {
        type: String,
        maxlength: [200, 'Bio should not be more than 200'],
        default: "Bio...",
    },
    profile_img: {
        type: String,
        default: () => {
            return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
        }
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "post"
    }],
    saved: [{
        type: Schema.Types.ObjectId,
        ref: "post"
    }],
    likedPost: [{
        type: Schema.Types.ObjectId,
        ref: "post"
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
}, {
    timestamps: {
        createdAt: 'joinedAt',
        updatedAt: 'updatedAt'
    }

})

export default mongoose.model("user", userSchema)