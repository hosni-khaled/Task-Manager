const express = require("express");
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRoutes");
const authController = require("./controllers/authController");
const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use("/api/user", userRouter);
app.use("/api/task", authController.protect, taskRouter);

module.exports = app;
