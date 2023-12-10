import RoleManagementModel from "./roleManagement.model.js";

class roleManagement {
    /**
     * add
     */
    static async add(reqBody) {
        return await RoleManagementModel(reqBody).save();
    }

    /**
     * Get
     */
    static async get(id) {
        return await RoleManagementModel.findOne({ _id: id }).sort({ created_at: -1 }).lean();
    }

    /**
     * List
     */
    static async list(query) {
        return await RoleManagementModel.find(query).lean();
    }

    /**
     * update
     */
    static async update(id, reqBody) {
        return await RoleManagementModel.findByIdAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
    }

    /**
     * Delete
     */
    static async delete(id) {
        return await RoleManagementModel.findByIdAndDelete({ _id: id }).lean();
    }
}

export default roleManagement;
