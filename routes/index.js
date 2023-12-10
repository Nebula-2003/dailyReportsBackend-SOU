import { usersRoutes } from "../services/users/index.js";
import { subjectsRoutes } from "../services/subjects/index.js";

const initialize = (app) => {
    app.use("/api/users", usersRoutes);
    app.use("/api/subjects", subjectsRoutes);
    app.use("/authError", (req, res, next) => next(new Error("DEFAULT_AUTH")));

    app.get("/ping", (req, res) => {
        res.status(200).send({
            success: true,
            statusCode: 200,
        });
    });
};

export { initialize };
