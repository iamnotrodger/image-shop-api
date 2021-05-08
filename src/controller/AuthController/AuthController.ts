import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { getManager } from 'typeorm';
import User from '../../entity/User';
import AuthenticationTokenMissingException from '../../exception/AuthenticationTokenMissingException';
import InvalidRequestException from '../../exception/InvalidRequestException';
import NotAuthorizedException from '../../exception/NotAuthorizedException';

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { username, password } = req.body;

        const userRepository = getManager().getRepository(User);
        const user = await userRepository.findOne({ username, password });

        if (user) {
            req.user = user;
            next();
        } else {
            throw new NotAuthorizedException(
                "Sorry, couldn't find user with that username or password",
            );
        }
    } catch (error) {
        next(error);
    }
};

export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { username, password } = req.body;

        const userRepository = getManager().getRepository(User);
        const user = await userRepository.save({ username, password });

        req.user = user;

        next();
    } catch (error) {
        if (error.code === '23505') {
            error = new InvalidRequestException('Username is already taken.');
        }
        next(error);
    }
};

export const assignToken = (req: Request, res: Response) => {
    const { id } = req.user as User;
    const access_token = sign({ id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: 36000,
    });

    res.status(200).json({ access_token });
};

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = getTokenFromHeader(req);
        const payload = verifyAccessToken(token);
        const { exp, iat, ...user } = payload;
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

const getTokenFromHeader = (req: Request) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new AuthenticationTokenMissingException();
    }
    return authorization.split(' ')[1];
};

const verifyAccessToken = (token: string) => {
    return verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, result) => {
        if (err) {
            throw new NotAuthorizedException(
                'Access-Token Invalid: ' + err.message,
            );
        }
        return result;
    }) as any;
};
