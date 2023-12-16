import mongoose from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true },
        managedBy: { type: Schema.Types.ObjectId, ref: "user" },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        members: [{ type: Schema.Types.ObjectId, ref: "user" }],
        createdBy: { type: Schema.Types.ObjectId, ref: "user" },
        updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
    },
    { timestamps: true, collection: "project" }
);

projectSchema.plugin(softDelete);

const Project = mongoose.model("project", projectSchema);

export default Project;
