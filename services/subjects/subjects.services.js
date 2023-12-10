import SubjectsModel from "./subjects.model.js";

class SubjectsServices {
    static async is_exist(reqBody) {
        return await SubjectsModel.findOne({
            subject_code: reqBody.subject_code,
        }).lean();
    }

    static async create(reqBody) {
        return await SubjectsModel.create(reqBody);
    }

    static async getList() {
        return await SubjectsModel.find().lean();
    }

    static async get(id) {
        return await SubjectsModel.findOne({ _id: id }).lean();
    }

    static async update(id, reqBody) {
        return await SubjectsModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
    }

    static async delete(id) {
        return await SubjectsModel.removeOne({ _id: id }, { new: true }).lean();
    }
}

export default SubjectsServices;
