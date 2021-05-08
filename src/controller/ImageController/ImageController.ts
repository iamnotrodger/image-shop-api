import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { getManager } from 'typeorm';
import Image from '../../entity/Image';
import User from '../../entity/User';
import InvalidRequestException from '../../exception/InvalidRequestException';
import NotAuthorizedException from '../../exception/NotAuthorizedException';

export const getImages = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        let user = req.user as User | undefined;

        const userRepository = getManager().getRepository(User);
        user = await userRepository.findOne({
            relations: ['images'],
            where: user,
            order: { id: 'DESC' },
        });

        if (user) {
            res.status(200).json(user.images);
        } else {
            throw new InvalidRequestException('User does not exist');
        }
    } catch (error) {
        next(error);
    }
};

export const uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = req.user as User;
        const { path, filename } = req.file as Express.Multer.File;

        const image = new Image();
        image.name = filename;
        image.path = path;
        image.url = `${req.protocol}://${req.get('host')}/${path}`;
        image.user = user;

        const imageRepository = getManager().getRepository(Image);
        await imageRepository.save(image);

        res.status(200).json(image);
    } catch (error) {
        next(error);
    }
};

export const deleteImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = req.user as User;
        const id = Number(req.params.id);

        await getManager().transaction(async (transactionManager) => {
            const image = await transactionManager.findOne(Image, {
                id,
            });
            validateImage(user, image);
            fs.unlinkSync(image!.path);
            await transactionManager.remove(Image, image);
        });

        res.status(200).send('Image deleted');
    } catch (error) {
        next(error);
    }
};

const validateImage = (user: User, image?: Image) => {
    if (!image) {
        throw new InvalidRequestException('Image does not exist');
    } else if (image!.userId !== user.id) {
        throw new NotAuthorizedException('Image does not belong to user');
    }
};
