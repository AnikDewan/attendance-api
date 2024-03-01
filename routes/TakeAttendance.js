import express from "express";
import Student from "../models/Students.js";
import fetchTeacher from "../middleware/FetchTeacher.js";

const router = express.Router();

router.put("/", fetchTeacher, (req, res) => {
  try {
    const allId = Object.keys(req.body);
    allId.forEach(async (id) => {
      const student = await Student.findById(id);
      const presence = student.presence + req.body[id];
      await Student.findByIdAndUpdate(
        id,
        { presence: presence },
        { new: true },
      );
    });
    res.json({ success: "Attendance submitted successfully" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
