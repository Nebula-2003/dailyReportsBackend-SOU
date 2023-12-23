import controller from "./timeSheet.controller.js";
import { Router } from "express";
import * as guard from "./../../helper/guards.js";
import { ROLE } from "./../../config/constant.config.js";

const router = Router();

router
    /*
     *  Add
     */
    .post("/create", guard.isAuthorized(ROLE.ADMIN), controller.create)

    /*
     *  Get By Id
     */
    .get("/get/:id", guard.isAuthorized(Object.values(ROLE)), controller.get)

    /*
     *  List All
     */
    .get("/list", guard.isAuthorized(Object.values(ROLE)), controller.list)

    /*
     *  Update
     */
    .put("/update/:id", guard.isAuthorized(ROLE.ADMIN), controller.update)

    /*
     *  Delete
     */
    .delete("/delete/:id", guard.isAuthorized(ROLE.ADMIN), controller.delete);

export default router;
