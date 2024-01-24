import express from "express";
import Class from "../models/Classes.js";
import fetchTeacher from "../middleware/FetchTeacher.js";

const router = express.Router();

router.post("/", fetchTeacher, async (req, res) => {
  try {
    const CLASS = await Class.create({
      name: req.body.name,
      teacher: req.teacher.id,
      access: req.body.access ? "only me" : "all",
    });
    res.json(CLASS);
  } catch {
    res.status(400).json({ error: "The class already exists" });
  }
});

export default router;
