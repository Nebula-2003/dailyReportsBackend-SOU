import SubjectsModel from "./subjects.model.js";
import { cacheSubjects, cacheSubjectsList } from "./subjects.cache.js";

class SubjectsServices {
    static async is_exist(reqBody) {
        const cData = cacheSubjects.getByQuery({ subject_code: reqBody.subject_code });
        if (cData) return cData;
        const data = await SubjectsModel.findOne({
            subject_code: reqBody.subject_code,
        }).lean();
        if(data){
            try {
                cacheSubjects.setByObj({ subject_code: data.subject_code }, data);
            } catch (error) {
                logger.error(error);
            }
        }
        return data;
    }

    static async create(reqBody) {
        cacheSubjectsList.flushAll();
        return await SubjectsModel.create(reqBody);
    }

    static async getList(query) {
        const cData = cacheSubjectsList.getByObj(query);
        if(cData) return cData;
        const data = await SubjectsModel.find().lean();
        if(data){
            try {
                cacheSubjectsList.setByObj(query, data);
            } catch (error) {
                logger.error(error);
            }
        }
        return data;
    }

    static async get(id) {
        const cData = cacheSubjects.getByQuery({ _id: id });
        if (cData) {
            return cData;
        }
        const data  = await SubjectsModel.findOne({ _id: id }).lean();
        if(data){
            try {
                cacheSubjects.setByObj({ _id: data._id, subject_code: data.subject_code }, data);
            } catch (error) {
                logger.error(error);
            }
        }
        return data;
    }

    static async update(id, reqBody) {
        cacheSubjectsList.flushAll();
        try {
            cacheSubjects.delByQuery({ _id: id });
        } catch (e) {
            console.log(e);
        }
        const data = await SubjectsModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
        if(data){
            try {
                cacheSubjects.setByObj({ _id: data._id, subject_code: data.subject_code }, data);
            } catch (error) {
                logger.error(error);
            }
        }
        return data;
    }

    static async delete(id) {
        cacheSubjectsList.flushAll();
        try {
            cacheSubjects.delByQuery({ _id: id });
        } catch (error) {
            console.log(error);
        }
        return await SubjectsModel.removeOne({ _id: id }, { new: true }).lean();
    }
}

export default SubjectsServices;
