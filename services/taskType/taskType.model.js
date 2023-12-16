import mongoose from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const Schema = mongoose.Schema;

const taskTypeSchema = new Schema(
    {
        content: {
            type: String,
            default: "",
        },
    },
    { timestamps: true, collection: "taskType" }
);

taskTypeSchema.plugin(softDelete);

const TaskType = mongoose.model("taskType", taskTypeSchema);

export default TaskType;
