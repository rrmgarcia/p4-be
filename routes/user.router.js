import { Router } from "express";
import User from "../objects/user.js";

const router = Router();

router.post("/register", async (req, res) => {
  const user = new User();
  const body = req.body;
  try {
    const savedUser = await user.createUser(body);
    res.json(savedUser);
  } catch (error) {
    res.status(500).send("An error occurred during user registration.")
  }
});

export default router;
