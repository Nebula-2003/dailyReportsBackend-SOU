import _ from "lodash";
import mongoose from "mongoose";
let subjectWise = (userId) => [
    {
        $match: {
            user: new mongoose.Types.ObjectId(userId),
        },
    },
    {
        $lookup: {
            from: "subjects",
            localField: "subject",
            foreignField: "_id",
            as: "subject",
        },
    },
    {
        $group: {
            _id: "$subject",
            total: {
                $sum: "$hours",
            },
        },
    },
    {
        $unwind: "$_id",
    },
    {
        $project: {
            subject: "$_id.subject_name",
            subjectCode: "$_id.subject_code",
            total: 1,
            _id: 0,
        },
    },
    {
        $sort: {
            total: -1,
        },
    },
];

export { subjectWise };
