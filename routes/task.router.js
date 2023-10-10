import { Router } from "express";
import Task from "../objects/task.js";

const router = Router();

//Creating Task
router.post("/", async (req, res) => {
  const task = new Task();
  const body = req.body;

  try {
    const savedTask = await task.createTask(body);
    res.json(savedTask);
  } catch (error) {
    res.status(500).send("An error occured while creating task");
  }
});

//Getting all tasks
router.get("/", async (req, res) => {
  const task = new Task();

  try {
    const tasks = await task.findTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).send("An error occured while fetching task");
  }
});

//Deleting Task
router.delete("/:id", async (req, res) => {
  const task = new Task();
  const taskId = req.params.id;

  try {
    const deletedTask = await task.deleteTaskById(taskId);
    res.json(deletedTask);
  } catch (error) {
    res.status(500).send("An error occurred while deleting task");
  }
});

//Editing Task
router.put("/:id", async (req, res) => {
  const task = new Task();
  const taskId = req.params.id;
  const updatedTaskData = req.body

  try {
    const updatedTask = await task.updateTaskById(taskId, updatedTaskData);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).send("An error occurred while updating task");
  }
});

export default router;
