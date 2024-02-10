import { commonResponse } from "../../helper/index.js";
import UsersModel from "./users.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { cacheUsers } from "./users.cache.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class UsersService {
    static async is_exist(reqBody) {
        try {
            const cData = cacheUsers.getByObj({ email: reqBody.email.toLowerCase() });
            if (cData) return cData;
        } catch (e) {
            console.log(e);
        }
        const data = await UsersModel.findOne({ email: reqBody.email.toLowerCase() }).lean();
        if (data) {
            try {
                cacheUsers.setByObj({ _id: data._id, email: data.email.toLowerCase() }, data);
            } catch (error) {
                console.log(error);
            }
        }
        return data;
    }

    static async get(id) {
        const data = await UsersModel.findOne({ _id: id }).lean();
        return data;
    }

    static async findOneByQuery(query) {

        const data = await UsersModel.findOne(query).lean();

        return data;
    }

    static async list(query, populate = []) {
        const data = await UsersModel.find(query).populate(populate).lean();
        return data;
    }

    static async save(reqBody) {
        return await new UsersModel(reqBody).save();
    }

    static async update(id, reqBody) {
        const data = await UsersModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
        return data;
    }

    static async remove(id) {
        try {
            cacheUsers.delByQuery({ _id: id });
        } catch (e) {
            console.log(e);
        }
        const data = await UsersModel.removeOne({ _id: id }, { new: true }).lean();
        return data;
    }
}

export default UsersService;
