import { Router } from "express";
import controller from "./subjects.controller.js";
import * as guard from "./../../helper/guards.js";
import { ROLE } from "./../../config/constant.config.js";

const router = Router();

router
    .get("/subject-list", guard.isAuthorized(Object.values(ROLE)), controller.getList)

    .get("/subject-detail/:id", guard.isAuthorized(Object.values(ROLE)), controller.get)

    .post("/create-subject", guard.isAuthorized(Object.values(ROLE)), controller.create)

    .put("/update-subject/:id", guard.isAuthorized(Object.values(ROLE)), controller.update)

    .delete("/delete-subject/:id", guard.isAuthorized(Object.values(ROLE)), controller.delete);

export default router;
