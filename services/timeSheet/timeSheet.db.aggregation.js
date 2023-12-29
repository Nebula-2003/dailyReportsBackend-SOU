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

let listForHod = () => [
    {
        $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
        },
    },
    {
        $unwind: "$user",
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
        $unwind: "$subject",
    },
    {
        $group: {
            _id: "$user",
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
            user: "$_id",
            total: 1,
            _id: 0,
        },
    },
    {
        $sort: {
            total: -1,
        },
    },
]

export { subjectWise };
