import TaskMasterModel from "./taskMaster.model.js";
import { taskMasterCacheList } from "./taskMaster.cache.js";
import { success } from "../../helper/commonResponse.js";

class taskMaster {
    /**
     * add
     */
    static async add(reqBody) {
        taskMasterCacheList.flushAll();
        return await TaskMasterModel(reqBody).save();
    }

    /**
     * Get
     */
    static async get(id) {
        return await TaskMasterModel.findOne({ _id: id }).sort({ created_at: -1 }).lean();
    }

    /**
     * List
     */
    static async list(query) {
        try {
            const cData = taskMasterCacheList.getByObj(query);
            if (cData) {
                return cData;
            }
        } catch (error) {
            console.log("Error while getting list for taskMaster", error);
        }
        let listAll = await TaskMasterModel.find(query).lean();
        try {
            const success = taskMasterCacheList.setByObj(query, listAll);
            if (!success) throw new Error("Getting Success false while setting list for taskMaster");
        } catch (error) {
            console.log("Error while setting list for taskMaster:", error);
        }
        return listAll;
    }

    /**
     * update
     */
    static async update(id, reqBody) {
        taskMasterCacheList.flushAll();
        return await TaskMasterModel.findByIdAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
    }

    /**
     * Delete
     */
    static async delete(id) {
        taskMasterCacheList.flushAll();
        return await TaskMasterModel.findByIdAndDelete({ _id: id }).lean();
    }
}

export default taskMaster;
