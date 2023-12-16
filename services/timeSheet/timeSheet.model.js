import mongoose from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const Schema = mongoose.Schema;

const timeSheetSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "user" },
        project: { type: Schema.Types.ObjectId, ref: "project" },
        task: { type: Schema.Types.ObjectId, ref: "task" },
        date: { type: Date, required: true },
        hours: { type: Number, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true, collection: "timeSheet" }
);

timeSheetSchema.plugin(softDelete);

const TimeSheet = mongoose.model("timeSheet", timeSheetSchema);

export default TimeSheet;
