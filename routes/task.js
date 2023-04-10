const express = require("express");
const {
  newTask,
  allTaskOfUser,
  udateTask,
  deleteTask,
} = require("../controller/task");

const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

//get all task
router.get("/all", isAuthenticated, allTaskOfUser);
//create a task
router.post("/new", isAuthenticated, newTask);
//update or delete a task
router
  .route("/:id")
  .put(isAuthenticated, udateTask)
  .delete(isAuthenticated, deleteTask);

module.exports = router;
