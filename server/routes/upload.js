const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const authMiddleware = require('../middleware/authMiddleware');

// Upload API
router.post('/', authMiddleware, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'uploads' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });
    };

    const result = await uploadToCloudinary();

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });

  } catch (err) {
    next(err);
  }
});

// Error handler (IMPORTANT)
router.use((err, req, res, next) => {
  if (err instanceof require('multer').MulterError) {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === 'Only image files allowed') {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: 'Server error' });
});

module.exports = router;