const express = require("express");
const taskController = require("./../controllers/taskController");

const router = express.Router();

router.route("/").get(taskController.getTasks).post(taskController.createTasks);

router
  .route("/:id")
  .patch(taskController.editTask)
  .delete(taskController.deleteTask);

module.exports = router;
