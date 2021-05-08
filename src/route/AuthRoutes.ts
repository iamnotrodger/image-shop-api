import { Router } from 'express';
import { assignToken, login, signUp } from '../controller/AuthController';
import {
    userSchema,
    validateRequest,
} from '../controller/ValidationController';

const AuthRoutes = Router();

AuthRoutes.post('/sign-up', validateRequest(userSchema), signUp, assignToken);
AuthRoutes.post('/login', validateRequest(userSchema), login, assignToken);

export default AuthRoutes;
