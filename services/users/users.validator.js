import Joi from "joi";
import { ROLE, DEVICE_TYPE } from "../../config/constant.config.js";
const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    number: Joi.string().default(""),
    role: Joi.string()
        .valid(...Object.values(ROLE))
        .default(ROLE.TEACHING_STAFF),
    hod: Joi.string().optional(),
    otp: Joi.number().default(0),
    fcm_token: Joi.string().default(""),
    device_type: Joi.string()
        .valid(...Object.values(DEVICE_TYPE))
        .default(DEVICE_TYPE.ANDROID),
    device_id: Joi.string().default(""),
    is_notification_on: Joi.boolean().default(true),
});

const updateUserSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
    first_name: Joi.string(),
    last_name: Joi.string(),
    number: Joi.string().default(""),
    role: Joi.string().valid(...Object.values(ROLE)),
    hod: Joi.string().optional(),
    otp: Joi.number(),
    fcm_token: Joi.string().default(""),
    device_type: Joi.string().valid(...Object.values(DEVICE_TYPE)),
    device_id: Joi.string().default(""),
    is_notification_on: Joi.boolean(),
});

export { userSchema, updateUserSchema };
