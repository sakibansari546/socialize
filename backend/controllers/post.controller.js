import Post from '../models/post.model.js';
import User from '../models/user.model.js';
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
            res.status(200).json({ success: true, message: 'Post created successfully', post });
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
            res.status(200).json({ success: true, message: 'Reel created successfully', reel });
        }
    } catch (error) {
        console.error('Error creating reel:', error);
        res.status(500).json({ message: error.message });
    }
};


export const getAllPosts = async (req, res) => {
    const { page } = req.query; // Current page number (from frontend)
    const limit = 5; // Number of posts per page
    const skip = (page - 1) * limit; // Skip the previous pages' posts

    try {
        const posts = await Post.find()
            .skip(skip)
            .limit(limit)
            .populate('author', 'username fullname profile_img')
            .sort({ createdAt: -1 });

        // Check if there are more posts for the next page
        const totalPosts = await Post.countDocuments();
        const hasMore = (skip + limit) < totalPosts;

        res.status(200).json({ posts, hasMore });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const likeOrDislike = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;

        // Check if userId is present
        if (!userId) {
            return res.status(400).json({ message: 'User not authenticated' });
        }

        // Find the post by postId
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            // User has already liked the post, remove the like
            await post.updateOne({ $pull: { likes: userId } });
            await user.updateOne({ $pull: { likedPost: postId } });
            return res.status(200).json({ success: true, message: 'Post unliked successfully' });
        } else {
            // User has not liked the post, add the like
            await post.updateOne({ $push: { likes: userId } });
            await user.updateOne({ $push: { likedPost: postId } });
            return res.status(200).json({ success: true, message: 'Post liked successfully' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
