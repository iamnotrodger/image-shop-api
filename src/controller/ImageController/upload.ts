import { Request } from 'express';
import fs, { mkdir } from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (
        req: Request,
        file: Express.Multer.File,
        callback: any,
    ) {
        const directory = './uploads/';
        if (!fs.existsSync(directory)) {
            mkdir(directory, (error) => callback(error, directory));
        } else {
            callback(null, directory);
        }
    },
    filename: function (
        req: Request,
        file: Express.Multer.File,
        callback: any,
    ) {
        const fileName = file.originalname.split(/\s+/).join('_');
        callback(null, `${new Date().toISOString()}_${fileName}`);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

export default upload;
