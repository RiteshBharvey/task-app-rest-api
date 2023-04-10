const asyncWrapper = require("../middlewares/asyncWrapper");
const { ErrorHandler } = require("../middlewares/error");
const Task = require("../model/task");

const newTask = asyncWrapper( async (req, res, next) => {
  const { title, description } = req.body;

  const task = await Task.create({ title, description, user: req.userDetails });

  res.status(201).json({ success: true, message: "Task created successfully" });
});

const allTaskOfUser = asyncWrapper( async (req, res, next) => {
  const userId = req.userDetails._id;
  const allTasks = await Task.find({ user: userId });
  res.status(200).json({ success: true, allTasks });
});

const udateTask = asyncWrapper( async (req, res, next) => {
  const taskId = req.params.id;

  const task = await Task.findById(taskId);

  if (!task) {
    return next(new ErrorHandler("No task found",404));
  }

  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(200).json({ status: true, message: "Task updated successfully" });
});

const deleteTask =asyncWrapper( async(req, res, next) => {
    const {id} = req.params;

    const task = await Task.findById(id);

    if (!task) {
        return next(new ErrorHandler("No task found",404));
        //return res.status(404).json({ status: false, message: "No task found" });
      }

    await task.deleteOne();
  
    res.status(200).json({ status: true, message: "Task deleted successfully" });
});

module.exports = { newTask, allTaskOfUser, udateTask, deleteTask };
