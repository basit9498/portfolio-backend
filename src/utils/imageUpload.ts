import { Request } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: Request, file: any, cb: Function) => {
  // Reject a file
  console.log('file', file);
  console.log('Request', req.file);
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'));
  }
};

export const uploadSingleImage = multer({
  storage: storage,
  //   fileFilter: fileFilter,
});
