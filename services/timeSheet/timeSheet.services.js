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
    static async get(id, populateFields) {
        return await TimeSheetModel.findById(id).populate(populateFields).lean();
    }

    /**
     * List
     */
    static async list(query, populateFields) {
        return await TimeSheetModel.find(query).populate(populateFields).lean();
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
