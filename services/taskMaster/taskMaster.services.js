import TaskMasterModel from './taskMaster.model.js';


class taskMaster{
    /**
    * add
    */
    static async add (reqBody) {
        return await TaskMasterModel(reqBody).save();
    }

    /**
    * Get
    */
    static async get (id) {
        return await TaskMasterModel.findOne({ _id: id }).sort({ created_at: -1 }).lean();
    }

    /**
    * List
    */
    static async list (query) {
        return await TaskMasterModel.find(query).lean();
    }

    /**
    * update
    */
    static async update (id, reqBody) {
        return await TaskMasterModel.findByIdAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
    }

    /**
    * Delete
    */
    static async delete (id) {
        return await TaskMasterModel.findByIdAndDelete({ _id: id }).lean();
    }

}

export default taskMaster;