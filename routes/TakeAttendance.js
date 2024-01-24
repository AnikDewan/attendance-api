import express from "express";
import Student from "../models/Students.js";
import fetchTeacher from "../middleware/FetchTeacher.js";

const router = express.Router();

router.put("/:studentid", fetchTeacher, async (req, res) => {
  try {
    const students = await Student.findById(req.params.studentid);
    if (!students) {
      return res.status(404).json({ error: "Student not found" });
    }
    const presence = students.presence + req.body.presence;
    const student = await Student.findByIdAndUpdate(
      req.params.studentid,
      { presence: presence },
      { new: true },
    );
    res.json(student);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
