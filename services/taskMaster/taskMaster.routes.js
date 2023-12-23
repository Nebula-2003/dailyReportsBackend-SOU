import controller from "./taskMaster.controller.js";
import { Router } from "express";
import * as guard from "./../../helper/guards.js";
import { ROLE } from "./../../config/constant.config.js";

const router = Router();

router
    /*
     *  Add
     */
    .post("/create", controller.create)

    /*
     *  Get By Id
     */
    .get("/get/:id", controller.get)

    /*
     *  List All
     */
    .get("/list", controller.list)

    /*
     *  Update
     */
    .put("/update/:id", controller.update)

    /*
     *  Delete
     */
    .delete("/delete/:id", controller.delete);

export default router;
