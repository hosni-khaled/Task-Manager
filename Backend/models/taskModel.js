const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  userId: String,
  title: {
    type: String,
    required: [true, "Task must have a title."],
  },
  description: {
    type: String,
    required: [true, "Task must have a description."],
  },
  status: {
    type: String,
    enum: {
      values: ["completed", "incomplete"],
      message: "Status is either: completed or incomplete",
    },
    default: "incomplete",
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("tasks", taskSchema);

module.exports = User;
