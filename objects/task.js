import TaskModel from "../models/task.entity.js";
import { v4 as uuidv4 } from "uuid";

class Task {
  constructor() {}

  createTask(task) {
    const { title, priority } = task;
    if (!title || !priority) {
      throw new Error("Failed to add task");
    }

    const newTask = new TaskModel({ ...task, _id: uuidv4()});
    const savedTask = newTask.save();
    return savedTask;
  }

  findTasks() {
    return TaskModel.find();
  }

  findTaskById(id) {
    return TaskModel.findById(id);
  }

  deleteTaskById(id) {
    return TaskModel.findByIdAndRemove(id);
  }

  updateTaskById(id, updatedTask) {
    return TaskModel.findByIdAndUpdate(id, updatedTask, { new: true });
  }
}

export default Task;
