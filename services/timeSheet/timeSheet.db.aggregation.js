import mongoose from "mongoose";

const subjectWise = (userId) => [
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

const subjectWiseArray = (userIdArray) => [
    {
        $match: {
            user: { $in: userIdArray.map((userId) => new mongoose.Types.ObjectId(userId)) },
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

export { subjectWise, subjectWiseArray };
