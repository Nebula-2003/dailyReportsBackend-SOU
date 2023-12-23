import controller from "./roleManagement.controller";
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
    .get("/get/:id", guard.isAuthorized(ROLE.ADMIN), controller.get)

    /*
     *  List All
     */
    .get("/list", guard.isAuthorized(ROLE.ADMIN), controller.list)

    /*
     *  Update
     */
    .put("/update/:id", guard.isAuthorized(ROLE.ADMIN), controller.update)

    /*
     *  Delete
     */
    .delete("/delete/:id", guard.isAuthorized(ROLE.ADMIN), controller.delete);

export default router;
