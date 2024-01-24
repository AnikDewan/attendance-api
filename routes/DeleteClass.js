import express from "express";
import Class from "../models/Classes.js";
import Student from "../models/Students.js";
import fetchTeacher from "../middleware/FetchTeacher.js";

const router = express.Router();

router.delete("/:classid", fetchTeacher, async (req, res) => {
  try {
    const classes = await Class.findById(req.params.classid);
    if (!classes) {
      return res.status(404).json({ error: "Class not found" });
    }
  } catch {
    return res.status(404).json({ error: "Invalid class id" });
  }
  try {
    const CLASS = await Class.findByIdAndDelete(req.params.classid);
    const student = await Student.deleteMany({ sec: req.params.classid });
    if (student.deletedCount) {
      res.json({ success: "Class & Students Deleted" });
    } else {
      res.json({ success: "Class Deleted" });
    }
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
