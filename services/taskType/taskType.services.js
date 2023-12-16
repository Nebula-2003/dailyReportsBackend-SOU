import TaskTypeModel from './taskType.model.js';


class taskType{
    /**
    * add
    */
    static async add (reqBody) {
        return await TaskTypeModel(reqBody).save();
    }

    /**
    * Get
    */
    static async get (id) {
        return await TaskTypeModel.findOne({ _id: id }).sort({ created_at: -1 }).lean();
    }

    /**
    * List
    */
    static async list (query) {
        return await TaskTypeModel.find(query).lean();
    }

    /**
    * update
    */
    static async update (id, reqBody) {
        return await TaskTypeModel.findByIdAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
    }

    /**
    * Delete
    */
    static async delete (id) {
        return await TaskTypeModel.findByIdAndDelete({ _id: id }).lean();
    }

}

export default taskType;