import Joi from "joi";

const create = Joi.object({
    title: Joi.string().required(),
    assignedBy: Joi.string().required(),
    assignedTo: Joi.array().items(Joi.string()).required(),
    description: Joi.string().required(),
    status: Joi.string().valid("New_Assigned", "In_Progress", "Completed").default("New_Assigned"),
    priority: Joi.string().valid("high", "medium", "low").default("low"),
    type: Joi.string().required(),
});

const update = Joi.object({
    title: Joi.string().optional(),
    assignedBy: Joi.string().optional(),
    assignedTo: Joi.array().items(Joi.string()).optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid("New_Assigned", "In_Progress", "Completed").default("New_Assigned"),
    priority: Joi.string().valid("high", "medium", "low").default("low"),
    active: Joi.boolean().optional(),
});

const changeStatus = Joi.object({
    status: Joi.string().valid("New_Assigned", "In_Progress", "Completed").required(),
});

export { create, update, changeStatus };
