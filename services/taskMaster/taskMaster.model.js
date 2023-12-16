import mongoose from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const Schema = mongoose.Schema;

const taskMasterSchema = new Schema(
    {
        task: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: Schema.Types.ObjectId, ref: "taskType" },
        status: { type: String, required: true, default: "active" },
        createdBy: { type: Schema.Types.ObjectId, ref: "user" },
        updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
    },
    { timestamps: true, collection: "taskMaster" }
);

taskMasterSchema.plugin(softDelete);

const TaskMaster = mongoose.model("taskMaster", taskMasterSchema);

export default TaskMaster;
