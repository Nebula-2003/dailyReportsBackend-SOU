import user from "../services/users/index.js";
import subject from "../services/subjects/index.js";
import project from "../services/project/index.js";
import taskMaster from "../services/taskMaster/index.js";
import taskType from "../services/taskType/index.js";
import timeSheet from "../services/timeSheet/index.js";

const initialize = (app) => {
    app.use("/api/users", user.usersRoutes);
    app.use("/api/subjects", subject.subjectsRoutes);
    app.use("/api/projects", project.projectRoutes);
    app.use("/api/taskMaster", taskMaster.taskMasterRoutes);
    app.use("/api/taskType", taskType.taskTypeRoutes);
    app.use("/api/timeSheet", timeSheet.timeSheetRoutes);
    app.use("/authError", (req, res, next) => next(new Error("DEFAULT_AUTH")));

    app.get("/ping", (req, res) => {
        res.status(200).send({
            success: true,
            statusCode: 200,
        });
    });
};

export { initialize };
