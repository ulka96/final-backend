
import multer from 'multer';
import path from 'path';

const profilePictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './ProfilePictures');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const profilePictureUpload = multer({ storage: profilePictureStorage });

export default profilePictureUpload;


