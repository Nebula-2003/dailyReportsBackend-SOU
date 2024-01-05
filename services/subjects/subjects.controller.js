import SubjectsServices from "./subjects.services.js";
import UsersServices from "../users/users.services.js";
import { commonResponse } from "../../helper/index.js";

class subjectsController {
    static async getList(req, res, next) {
        try {
            let query = {};
            let user = await UsersServices.get(req.user.id);
            console.log("🚀 ~ file: subject", req.query.all === undefined || req.query.all === "false");
            if (req.query.all === undefined || req.query.all === "false") {
                if (user.subjects === undefined || user.subjects.length === 0) {
                    return commonResponse.success(res, "SUBJECT_NOT_FOUND", 200, {});
                }
                query = { subjects: { $in: user.subjects } };
            }
            const subjects = await SubjectsServices.getList(query);
            if (subjects.length > 0) {
                return commonResponse.success(res, "SUBJECT_LIST", 200, subjects);
            }
            return commonResponse.success(res, "SUBECT_NOT_FOUND", 200, {});
        } catch (error) {
            console.log("🚀 ~ file: subjects.controller.js:23 ~ subjectsController ~ getList ~ error:", error);
            return commonResponse.error(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, error.message);
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
            console.log(error);
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
