import TasksModel from "./tasks.model.js";

class tasks {
    /**
     * add
     */
    static async add(reqBody) {
        return await TasksModel(reqBody).save();
    }

    /**
     * Get
     */
    static async get(id) {
        return await TasksModel.findOne({ _id: id }).sort({ created_at: -1 }).lean();
    }

    /**
     * List
     */
    static async list(query, priorityOrder) {
        console.log("🚀 ~ tasks ~ list ~ sort:", priorityOrder)
        let data = await TasksModel.find(query).populate("assignedBy assignedTo type").lean();
        if (Object.values(priorityOrder).length > 0) {
            return data.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        }
        return data;
    }

    /**
     * update
     */
    static async update(id, reqBody) {
        return await TasksModel.findByIdAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
    }

    /**
     * Delete
     */
    static async delete(id) {
        return await TasksModel.findByIdAndDelete({ _id: id }).lean();
    }
}

export default tasks;
