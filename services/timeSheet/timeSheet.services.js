import TimeSheetModel from "./timeSheet.model.js";

class timeSheet {
    /**
     * add
     */
    static async add(reqBody) {
        return await TimeSheetModel(reqBody).save();
    }

    /**
     * Get
     */
    static async get(id) {
        return await TimeSheetModel.findOne({ _id: id }).sort({ created_at: -1 }).lean();
    }

    /**
     * List
     */
    static async list(query) {
        return await TimeSheetModel.find(query).lean();
    }

    /**
     * update
     */
    static async update(id, reqBody) {
        return await TimeSheetModel.findByIdAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
    }

    /**
     * Delete
     */
    static async delete(id) {
        return await TimeSheetModel.findByIdAndDelete({ _id: id }).lean();
    }

    /**
     * Aggregate
     */
    static async aggregate(aggregation) {
        return await TimeSheetModel.aggregate(aggregation);
    }
}

export default timeSheet;
