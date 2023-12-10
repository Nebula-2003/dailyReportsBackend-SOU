import mongoose from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const Schema = mongoose.Schema;

const roleManagementSchema = new Schema(
    {
        role: { type: String, required: true },
        timeSheetSelf: {
            add: Boolean,
            view: Boolean,
            edit: Boolean,
            delete: Boolean,
        },
        timeSheetAll: {
            add: Boolean,
            view: Boolean,
            edit: Boolean,
            delete: Boolean,
        },
        timeSheetTeam: {
            add: Boolean,
            view: Boolean,
            edit: Boolean,
            delete: Boolean,
        },
    },
    { timestamps: true, collection: "roleManagement" }
);

roleManagementSchema.plugin(softDelete);

const RoleManagement = mongoose.model("roleManagement", roleManagementSchema);

export default RoleManagement;
