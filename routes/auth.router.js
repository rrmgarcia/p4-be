import { Router } from "express";
import User from "../objects/user.js";

const router = Router();

router.post("/signin", async (req, res) => {
  try {
    const user = new User();
    const body = req.body;
    const userData = await user.login(body.username, body.password);

    if (!userData) {
      res.status(401);
    } else {
      res.status(200).send(userData);
    }
  } catch (err) {
    res.status(404);
  }
});

export default router;
