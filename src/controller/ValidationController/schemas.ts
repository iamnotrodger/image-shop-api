import Joi from 'joi';

export const userSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const idSchema = Joi.object().keys({
    id: Joi.number().required(),
});
