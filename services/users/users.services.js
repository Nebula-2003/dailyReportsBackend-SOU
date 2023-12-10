import { commonResponse } from "../../helper/index.js";
import UsersModel from "./users.model.js";

class UsersService {
    static async is_exist(reqBody) {
        return await UsersModel.findOne({ email: reqBody.email }).lean();
    }

    static async get(id) {
        return await UsersModel.findOne({ _id: id }).lean();
    }

    static async save(reqBody) {
        return await new UsersModel(reqBody).save();
    }

    static async update(id, reqBody) {
        return await UsersModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
    }

    static async remove(id) {
        return await UsersModel.removeOne({ _id: id }, { new: true }).lean();
    }
}

export default UsersService;
