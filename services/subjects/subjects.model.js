import mongoose from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const subjectsSchema = new mongoose.Schema(
    {
        subject_code: {
            type: Number,
            unique: true,
            required: true,
        },
        subject_name: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

subjectsSchema.plugin(softDelete);

const Subjects = mongoose.model("Subjects", subjectsSchema);

export default Subjects;
