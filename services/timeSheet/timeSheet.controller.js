import Service from "./timeSheet.services.js";
import UserServices from "../users/users.services.js";
import { commonResponse } from "../../helper/index.js";
import { subjectWise, subjectWiseArray } from "./timeSheet.db.aggregation.js";

class timeSheet {
    /**
     * Add
     */
    static async create(req, res, next) {
        try {
            let data = await Service.add(req.body);
            if (data) {
                return commonResponse.success(res, "TIME_SHEET_CREATE", 200, data, "Success");
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, "Something went wrong, Please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    }

    /**
     * Get
     */

    static async get(req, res, next) {
        try {
            let data = await Service.get(req.params.id);
            if (data) {
                return commonResponse.success(res, "TIME_SHEET_GET", 200, data, "Success");
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, "Something went wrong, Please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    }

    /**
     * List
     */

    static async list(req, res, next) {
        try {
            let list;
            if (req.query.aggregate === "subjectWise") {
                list = await Service.aggregate(subjectWise(req.user.id));
            } else {
                let query = { user: req.user.id, date: {} };
                query.limit = req.query.limit || "";
                query.page = req.query.page || "";
                if (req.query.startDate) {
                    query.date.$gte = new Date(req.query.startDate);
                }
                if (req.query.endDate) {
                    query.date.$lte = new Date(req.query.endDate);
                }
                if (!Object.keys(query.date).length) {
                    delete query.date;
                }
                let populateFields = [
                    {
                        path: "project",
                        select: "name email",
                    },
                    {
                        path: "subject",
                        select: "subject_name",
                    },
                ];
                list = await Service.list(query, populateFields);
            }
            if (list) {
                return commonResponse.success(res, "TIME_SHEET_GET", 200, list, "Success");
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, "Something went wrong, Please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    }
    /**
     * List For hod
     */

    static async listHod(req, res, next) {
        try {
            let subordinates = await UserServices.list({ hod: req.user.id });
            if (!subordinates.length) {
                return commonResponse.success(res, "TIME_SHEET_GET", 200, [], "Success");
            }
            if (req.query.aggregate === "subjectWise") {
                let list = await Service.aggregate(subjectWiseArray(subordinates.map((sub) => sub._id)));
                if (list) {
                    return commonResponse.success(res, "TIME_SHEET_GET", 200, list, "Success");
                } else {
                    return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, "Something went wrong, Please try again");
                }
            }
            let list = await Service.list({ user: { $in: subordinates.map((sub) => sub._id) } });
            if (list) {
                return commonResponse.success(res, "TIME_SHEET_GET", 200, list, "Success");
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, "Something went wrong, Please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    }

    /**
     * Update
     */

    static async update(req, res, next) {
        try {
            let update = await Service.update(req.params.id, req.body);
            if (update) {
                return commonResponse.success(res, "TIME_SHEET_UPDATE", 200, update, "Success");
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, "Something went wrong, Please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    }

    /**
     * delete
     */

    static async delete(req, res, next) {
        try {
            let deleteTerms = await Service.delete(req.params.id);
            if (deleteTerms) {
                return commonResponse.success(res, "TIME_SHEET_DELETE", 200, deleteTerms, "Success");
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, "Something went wrong, Please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    }
}

export default timeSheet;
