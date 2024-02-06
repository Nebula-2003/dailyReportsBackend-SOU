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
        let limit,skip;
        if (query.limit && query.limit != "") {
            limit = parseInt(query.limit);
          } else {
            limit = 10;
          }
        
          if (query.page && query.page != "") {
            let page = parseInt(query.page);
            page = page - 1;
            skip = page * limit;
          } else {
            skip = 0;
          }
          delete query.limit;
          delete query.page;

        return await TimeSheetModel.find(query).populate(populateFields).limit(limit).skip(skip).lean();
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
        return await TimeSheetModel.findByIdAndDelete({ _id: id });
    }

    /**
     * Aggregate
     */
    static async aggregate(aggregation) {
        return await TimeSheetModel.aggregate(aggregation);
    }
}

export default timeSheet;
