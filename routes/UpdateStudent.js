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
  } catch {
    res.status(404).json({ error: "Invalid student id" });
  }
  try {
    const update = {};
    if (req.body.name) {
      update.name = req.body.name;
    }
    if (req.body.roll) {
      update.roll = req.body.roll;
    }
    await Student.findByIdAndUpdate(req.params.studentid, update, {
      new: true,
    });
    res.json({ success: "Student updated successfully" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
