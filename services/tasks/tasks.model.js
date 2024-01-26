import mongoose from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const Schema = mongoose.Schema;

const tasksSchema = new Schema(
    {
        title: { type: String, required: true },
        assignedBy: { type: Schema.Types.ObjectId, ref: "Users" },
        assignedTo: [{ type: Schema.Types.ObjectId, ref: "Users" }],
        description: { type: String, required: true },
        status: { type: String, enum: ["New_Assigned", "In_Progress", "Completed"], default: "New_Assigned" },
        priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
        active: { type: Boolean, default: true },
        type: { type: Schema.Types.ObjectId, ref: "taskType" },
    },
    { timestamps: true, collection: "tasks" }
);

tasksSchema.plugin(softDelete);

const Tasks = mongoose.model("tasks", tasksSchema);

export default Tasks;
