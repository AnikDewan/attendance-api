import express from "express";
import Student from "../models/Students.js";
import fetchTeacher from "../middleware/FetchTeacher.js";

const router = express.Router();

router.delete("/:studentid", fetchTeacher, async (req, res) => {
  try {
    const students = await Student.findById(req.params.studentid);
    if (!students) {
      return res.status(404).json({ error: "Student not found" });
    }
  } catch {
    return res.status(404).json({ error: "Invalid class id" });
  }
  try {
    await Student.findByIdAndDelete(req.params.studentid);
    res.json({ success: "Student deleted" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
