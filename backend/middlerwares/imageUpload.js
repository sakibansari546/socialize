// backend/utils/multerConfig.js
import multer from "multer";
import path from "path";

const storage = multer.memoryStorage(); // You can use diskStorage if needed

export const imageUpload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});