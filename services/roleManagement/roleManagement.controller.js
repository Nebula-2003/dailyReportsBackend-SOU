import Service from "./roleManagement.services.js";

class roleManagement {
    /**
     * Add
     */
    static async create(req, res, next) {
        try {
            let data = await Service.add(req.body);
            if (data) {
                return commonResponse.success(res, "ROLE_MANAGEMENT_CREATE", 200, data, "Success");
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

    static async create(req, res, next) {
        try {
            let data = await Service.get(req.params.id);
            if (data) {
                return commonResponse.success(res, "ROLE_MANAGEMENT_GET", 200, data, "Success");
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

    static async create(req, res, next) {
        try {
            let query = {};
            let listAll = await Service.list(query);
            if (listAll) {
                return commonResponse.success(res, "ROLE_MANAGEMENT_GET", 200, listAll, "Success");
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

    static async create(req, res, next) {
        try {
            let update = await Service.update(req.params.id, req.body);
            if (update) {
                return commonResponse.success(res, "ROLE_MANAGEMENT_UPDATE", 200, update, "Success");
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

    static async create(req, res, next) {
        try {
            let deleteTerms = await Service.delete(req.params.id);
            if (deleteTerms) {
                return commonResponse.success(res, "ROLE_MANAGEMENT_DELETE", 200, deleteTerms, "Success");
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, "Something went wrong, Please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    }
}
