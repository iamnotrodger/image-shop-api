import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exception/HttpException';
import NotFoundException from '../../exception/NotFoundException';

/** If a Request is made to a route that does not exist it will be redirected to this middleware */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundException());
};

export const errorHandler = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send(message);
};
