import express from "express";
import Student from "../models/Students.js";
import Class from "../models/Classes.js";
import fetchTeacher from "../middleware/FetchTeacher.js";

const router = express.Router();

router.get("/:classid", fetchTeacher, async (req, res) => {
	try {
    const classes = await Class.findById(req.params.classid);
    if (!classes) {
      return res.status(404).json({ error: "Class not found" });
    }
  } catch {
    return res.status(404).json({ error: "Invalid class id" });
	}
  try {
    const students = await Student.find({ sec: req.params.classid });
    res.json(students);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
