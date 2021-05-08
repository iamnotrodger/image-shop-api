import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Schema } from 'joi';
import InvalidRequestException from '../../exception/InvalidRequestException';
import NotFoundException from '../../exception/NotFoundException';

export const validateRequest = (schema: Schema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const { details } = error;
            const message: string =
                'Invalid Request: Invalid JSON. ' +
                details.map((i) => i.message).join(',');

            next(new InvalidRequestException(message));
        } else {
            next();
        }
    };
};

export const validateParams = (schema: Schema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.params);
        if (error) {
            const { details } = error;
            const message: string =
                'Invalid Request: Invalid URL parameters. ' +
                details.map((i) => i.message).join(',');

            next(new NotFoundException(message));
        } else {
            next();
        }
    };
};
