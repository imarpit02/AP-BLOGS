import multer from 'multer';

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowedFiles = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/webp'
  ];

  if (!allowedFiles.includes(file.mimetype)) {
    return cb(new Error('Only images are allowed.'), false);
  }

  cb(null, true);
}

const upload = multer({ storage, fileFilter });

export default upload;
