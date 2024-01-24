import express from "express";
import Teacher from "../models/Teachers.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env["JWT_SECRET"];

router.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const encPass = await bcrypt.hash(req.body.password, salt);
  try {
    const teacher = await Teacher.create({
      name: req.body.name,
      password: encPass,
    });
    const data = {
      teacher: {
        id: teacher.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    res.json(authToken);
  } catch {
    res.status(400).json({ error: "The name already exists" });
  }
});

export default router;
