import { Router } from "express";
import controller from "./users.controller.js";
import * as guard from "./../../helper/guards.js";
import { ROLE } from "./../../config/constant.config.js";

const router = Router();

router
    .post("/register", controller.register)

    .post("/login", controller.login)

    .post("/resend-verification-link", controller.resendVerificationLink)

    .post("/verify-user", controller.verifyUser)

    .post("/forgot-password", controller.forgotPassword)

    .post("/reset-password", controller.resetPassword)

    .put("/update", multerSetting, guard.isAuthorized(["admin", "organizer", "player"]), controller.update)

    .delete("/delete/:id", guard.isAuthorized(["admin"]), controller.delete)

    .post("/change-password", guard.isAuthorized(["admin", "organizer", "player"]), controller.changePassword)

    .get("/get-profile", guard.isAuthorized(["admin", "organizer", "player"]), controller.get)

    .get("/get/:id", guard.isAuthorized(["admin", "organizer", "player"]), controller.getUserById)

    .post("/logout", guard.isAuthorized(["admin", "organizer", "player"]), controller.logout);

export default router;
