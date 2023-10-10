import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id: String,
  title: String,
  priority: String,
  userid: String,
});

const TaskModel = mongoose.model("task", schema);

export default TaskModel;
