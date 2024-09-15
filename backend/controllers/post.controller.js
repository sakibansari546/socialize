import Post from '../models/post.model.js'
import User from '../models/user.model.js'
import cloudinary from '../utils/cloudinary.js';
import { getDataURI } from '../utils/dataURI.js';

export const createPost = async (req, res) => {
    try {
        const { type, caption } = req.body;
        const postImage = req.file;
        const userId = req.userId;

        const user = await User.findById(userId);

        if (!caption) return res.status(400).json({ message: 'Caption is required' });
        if (!postImage) return res.status(400).json({ message: 'Post Image is required' });
        if (type !== 'post') return res.status(400).json({ message: 'Invalid post type' });

        if (type === 'post') {
            const fileURI = getDataURI(postImage);
            const cloudRes = await cloudinary.uploader.upload(fileURI, {
                resource_type: "image",
                folder: "posts"
            });
            const post = new Post({
                type,
                caption,
                post: cloudRes.secure_url,
                author: userId
            });
            user.posts.push(post._id);
            await Promise.all([user.save(), post.save()]);
            res.status(200).json({ message: 'Post created successfully', post });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createReels = async (req, res) => {
    try {
        const { type, caption } = req.body;
        const reelVideo = req.file;
        const userId = req.userId;

        const user = await User.findById(userId);

        if (!reelVideo) {
            return res.status(400).json({ message: 'Reel Video is required' });
        }
        if (!caption) return res.status(400).json({ message: 'Caption is required' });
        if (type !== 'reels') return res.status(400).json({ message: 'Invalid post type' });

        if (type === 'reels') {
            const fileURI = getDataURI(reelVideo);
            const cloudRes = await cloudinary.uploader.upload(fileURI, {
                resource_type: "video",
                folder: "posts"
            });
            const reel = new Post({
                type,
                caption,
                post: cloudRes.secure_url,
                author: userId
            });
            user.posts.push(reel._id);
            await Promise.all([user.save(), reel.save()]);
            res.status(200).json({ message: 'Reel created successfully', reel });
        }
    } catch (error) {
        console.error('Error creating reel:', error);
        res.status(500).json({ message: error.message });
    }
};
