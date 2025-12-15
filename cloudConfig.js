// cloudConfig.js
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // ❌ remove this line

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Instead of CloudinaryStorage, use Multer's memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = { cloudinary, upload };