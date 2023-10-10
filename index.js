import express from "express";
import process from "node:process";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import jwt from "jsonwebtoken"

dotenv.config();

//Objects
import UserRouter from "./routes/user.router.js";
import AuthRouter from "./routes/auth.router.js";
import TaskRouter from "./routes/task.router.js";


//Server
const app = express();
const PORT = process.env.PORT || 9999;

app.set("port", PORT);

//Database
mongoose
  .connect(process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/todo_app")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} for ${req.url}`);

  next();
});

app.use("/user", UserRouter);
app.use("/auth", AuthRouter);

// TOKEN CHECK
app.use((req, res, next) => {
  const token = req.headers.authorization;
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.sendStatus(401);
  }
});

app.use("/todo", TaskRouter);

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
