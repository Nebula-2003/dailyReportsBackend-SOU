import { Router } from "express";
import controller from "./users.controller.js";
import * as guard from "./../../helper/guards.js";
import { ROLE } from "./../../config/constant.config.js";
import { userSchema, updateUserSchema } from "./users.validator.js";
import { validateBody } from "./../../helper/validation.js";

const router = Router();

router
    .post("/register", validateBody(userSchema), controller.register)

    .post("/login", controller.login)

    .post("/resend-verification-link", controller.resendVerificationLink)

    .post("/verify-user", controller.verifyUser)

    .post("/forgot-password", controller.forgotPassword)

    .post("/reset-password", controller.resetPassword)

    .put("/update", validateBody(updateUserSchema), guard.isAuthorized(Object.values(ROLE)), controller.update)

    .delete("/delete/:id", guard.isAuthorized(ROLE.ADMIN), controller.delete)

    .post("/change-password", guard.isAuthorized(Object.values(ROLE)), controller.changePassword)

    .get("/get-profile", guard.isAuthorized(Object.values(ROLE)), controller.get)

    .get("/get/:id", guard.isAuthorized(Object.values(ROLE)), controller.getUserById)

    .post("/logout", guard.isAuthorized(Object.values(ROLE)), controller.logout)

    .get("/get-staff-under", guard.isAuthorized(ROLE.HOD), controller.list);
export default router;
