import controller from "./tasks.controller.js";
import { Router } from "express";
import * as guard from "./../../helper/guards.js";
import { ROLE } from "../../config/constant.config.js";
import { create, update, changeStatus } from "./tasks.validation.js";
import { validateBody } from "./../../helper/validation.js";

const router = Router();

router
    /*
     *  Add
     */
    .post("/create", validateBody(create), guard.isAuthorized(Object.values(ROLE)), controller.create)

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
    .put("/update/:id", validateBody(update), guard.isAuthorized(Object.values(ROLE)), controller.update)

    /*
     *  Update status
     */
    .put("/change-status/:id", validateBody(changeStatus), guard.isAuthorized(Object.values(ROLE)), controller.update)

    /*
     *  Delete
     */
    .delete("/delete/:id", guard.isAuthorized(Object.values(ROLE)), controller.delete);

export default router;
