import mongoose from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const Schema = mongoose.Schema;

const taskTypeSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true, default: "active" },
        createdBy: { type: Schema.Types.ObjectId, ref: "user" },
        updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
    },
    { timestamps: true, collection: "taskType" }
);

taskTypeSchema.plugin(softDelete);

const TaskType = mongoose.model("taskType", taskTypeSchema);

export default TaskType;
