import express from "express";
import fetchTeacher from "../middleware/FetchTeacher.js";
import Teacher from "../models/Teachers.js";

const router = express.Router();

router.get("/", fetchTeacher, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select("-password");
    res.json(teacher);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
