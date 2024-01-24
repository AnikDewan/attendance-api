import express from "express";
import Teacher from "../models/Teachers.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env["JWT_SECRET"];

router.post("/", async (req, res) => {
  const { name, password } = req.body;
  try {
    let teacher = await Teacher.findOne({ name: name });
    if (teacher && (await bcrypt.compare(password, teacher.password))) {
      const data = {
        teacher: {
          id: teacher.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch {
    res.status(500).json({ error: "Inreral server error" });
  }
});

export default router;
