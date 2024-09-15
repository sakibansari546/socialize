import multer from 'multer';

// Multer storage setup for video files using memory storage
const videoStorage = multer.memoryStorage();

// File filter to accept only video files
const videoFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Not a video! Please upload a video file.'), false); // Reject the file
    }
};

// Video upload middleware
const uploadVideo = multer({
    storage: videoStorage,
    fileFilter: videoFileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // Limit file size to 100MB (optional)
});

export default uploadVideo;
