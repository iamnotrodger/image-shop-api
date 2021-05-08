import Joi from 'joi';

export const userSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
});
