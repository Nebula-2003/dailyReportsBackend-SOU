import ProjectModel from './project.model.js';


class project{
    /**
    * add
    */
    static async add (reqBody) {
        return await ProjectModel(reqBody).save();
    }

    /**
    * Get
    */
    static async get (id) {
        return await ProjectModel.findOne({ _id: id }).sort({ created_at: -1 }).lean();
    }

    /**
    * List
    */
    static async list (query) {
        return await ProjectModel.find(query).lean();
    }

    /**
    * update
    */
    static async update (id, reqBody) {
        return await ProjectModel.findByIdAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
    }

    /**
    * Delete
    */
    static async delete (id) {
        return await ProjectModel.findByIdAndDelete({ _id: id }).lean();
    }

}

export default project;