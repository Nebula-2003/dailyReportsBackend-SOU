import { Router } from "express";
import controller from "./subjects.controller.js";

const router = Router();

router.get("/subject-list", controller.getList);

router.get("/subject-detail/:id", controller.get);

router.post("/create-subject", controller.create);

router.put("/update-subject/:id", controller.update);

router.delete("/delete-subject/:id", controller.delete);

export default router;
