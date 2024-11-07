const Task = require("./../models/taskModel");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.body.userId });
  res.status(400).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks,
    },
  });
};

exports.createTasks = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.editTask = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found!",
      });
    }
    if (task.userId !== req.body.userId) {
      return res.status(400).json({
        status: "fail",
        message: "You are not the owner of this task",
      });
    }
    task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found!",
      });
    }
    if (task.userId !== req.body.userId) {
      return res.status(400).json({
        status: "fail",
        message: "You are not the owner of this task",
      });
    }
    task = await Task.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      message: "Your task deleted successfuly!",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
