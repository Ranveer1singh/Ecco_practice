const multer = require('multer');
const path = require('path');
const fs = require('fs')


// Define the path to the uploads directory within src/asset
const uploadsDir =path.join('D:', 'C DRIVE DATA', 'Desktop', 'Ecco_practice', 'src', 'asset', 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the directory exists before saving the file
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir); // specify the directory for uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename with current timestamp
  },
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // limit file size to 5MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = upload;
