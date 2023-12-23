import mongoose from "mongoose";
import softDelete from "mongoosejs-soft-delete";
import { DEVICE_TYPE, ROLE, STATUS } from "../../config/constant.config.js";

const { Schema } = mongoose;

const usersSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: false,
            default: "",
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
            default: "",
        },
        role: {
            type: String,
            enum: Object.values(ROLE),
            default: ROLE.TEACHING_STAFF,
            required: false,
        },
        hod: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: false,
        },
        otp: {
            type: Number,
            required: false,
            default: 0,
        },
        fcm_token: {
            type: String,
            required: false,
            default: "",
        },
        device_type: {
            type: String,
            enum: Object.values(DEVICE_TYPE),
            default: DEVICE_TYPE.ANDROID,
            required: false,
        },
        device_id: {
            type: String,
            required: false,
            default: "",
        },
        is_notification_on: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

usersSchema.plugin(softDelete);

const Users = mongoose.model("Users", usersSchema);

export default Users;
