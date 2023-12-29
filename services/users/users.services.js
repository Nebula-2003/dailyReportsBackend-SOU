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
            const cData = cacheUsers.getByObj({ email: reqBody.email });
            if (cData) return cData;
        } catch (e) {
            console.log(e);
        }
        const data = await UsersModel.findOne({ email: reqBody.email }).lean();
        if (data) {
            try {
                cacheUsers.setByObj({ _id: data._id, email: data.email }, data);
            } catch (error) {
                console.log(error);
            }
        }
        return data;
    }

    static async get(id) {
        try {
            const cData = cacheUsers.getByObj({ _id: id });
            if (cData) return cData;
        } catch (e) {
            console.log(e);
        }
        const data = await UsersModel.findOne({ _id: id }).lean();
        if (data) {
            try {
                cacheUsers.setByObj({ _id: data._id, email: data.email }, data);
            } catch (error) {
                console.log(error);
            }
        }
        return data;
    }

    static async findOneByQuery(query) {
        // if (query.email || query._id) {
        //     try {
        //         const cData = cacheUsers.getByQuery({ email: query.email });
        //         if (cData) return cData;
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }
        const data = await UsersModel.findOne(query).lean();
        // if (data) {
        //     try {
        //         cacheUsers.setByObj({ _id: data._id, email: data.email }, data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        return data;
    }

    static async list(query) {
        const data = await UsersModel.find(query).lean();
        return data;
    }

    static async save(reqBody) {
        return await new UsersModel(reqBody).save();
    }

    static async update(id, reqBody) {
        try {
            cacheUsers.delByQuery({ _id: id });
        } catch (e) {
            console.log(e);
        }
        if (reqBody.image) {
            try {
                let user = await UsersModel.findOne({ _id: id }).lean();
                if (user.image) {
                    fs.unlinkSync(path.join(__dirname, "./../../public", user.image));
                }
            } catch (error) {
                console.log(error);
            }
        }
        const data = await UsersModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
        if (data) {
            try {
                cacheUsers.setByObj({ _id: data._id, email: data.email }, data);
            } catch (error) {
                console.log(error);
            }
        }
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
