"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleImage = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const fileFilter = (req, file, cb) => {
    // Reject a file
    console.log('file', file);
    console.log('Request', req.file);
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('File type not supported'));
    }
};
exports.uploadSingleImage = (0, multer_1.default)({
    storage: storage,
    //   fileFilter: fileFilter,
});
//# sourceMappingURL=imageUpload.js.map