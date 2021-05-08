import { Router } from 'express';
import { verifyToken } from '../controller/AuthController';
import {
    deleteImage,
    getImages,
    upload,
    uploadImage,
} from '../controller/ImageController';
import { idSchema, validateParams } from '../controller/ValidationController';

const ImageRoutes = Router();

ImageRoutes.get('/', verifyToken, getImages);
ImageRoutes.post('/', verifyToken, upload.single('image'), uploadImage);
ImageRoutes.delete('/:id', validateParams(idSchema), verifyToken, deleteImage);
ImageRoutes.post('/multi');

export default ImageRoutes;
