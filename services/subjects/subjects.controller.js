import SubjectsServices from "./subjects.services.js";
import { commonResponse } from "../../helper/index.js";

class subjectsController {
    static async getList(req, res, next) {
        try {
            const subjects = await SubjectsServices.getList();
            if (subjects.length > 0) {
                return commonResponse.success(res, "SUBJECT_LIST", 200, subjects);
            }
            return commonResponse.success(res, "SUBECT_NOT_FOUND", 200, {});
        } catch (error) {
            return commonResponse.error(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    }

    static async get(req, res, next) {
        try {
            const subject = await SubjectsServices.get(req.params.id);
            if (subject) {
                return commonResponse.success(res, "SUBJECT_DETAIL", 200, subject);
            }
            return commonResponse.success(res, "SUBJECT_NOT_FOUND", 200, {});
        } catch (error) {
            return commonResponse.error(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    }

    static async create(req, res, next) {
        try {
            const isExist = await SubjectsServices.is_exist(req.body);
            if (isExist) {
                return commonResponse.error(res, "SUBJECT_ALREADY_EXIST", 500);
            }
            const subject = await SubjectsServices.create(req.body);
            console.log(subject);
            if (subject) {
                return commonResponse.success(res, "SUBJECT_CREATED", 200, subject);
            }
            return commonResponse.error(res, "SUBJECT_NOT_CREATED", 500);
        } catch (error) {
            return commonResponse.error(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    }

    static async update(req, res, next) {
        try {
            const subject = await SubjectsServices.update(req.params.id, req.body);
            if (!subject) {
                return commonResponse.error(res, "SUBJECT_NOT_FOUND", 500);
            }
            return commonResponse.success(res, "SUBJECT_UPDATED", 200, subject);
        } catch (error) {
            return commonResponse.error(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    }

    static async delete(req, res, next) {
        try {
            const is_exist = await SubjectsServices.get(req.params.id);
            if (is_exist) {
                const subject = await SubjectsServices.delete(req.params.id);
                return commonResponse.success(res, "SUBJECT_DELETED", 200, subject);
            }
        } catch (error) {
            return commonResponse.error(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500);
        }
    }
}

export default subjectsController;
