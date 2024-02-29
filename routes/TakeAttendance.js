import express from "express";
import Student from "../models/Students.js";
import fetchTeacher from "../middleware/FetchTeacher.js";

const router = express.Router();

const takeAttendance = async (id, pr) => {
  const student = await Student.findById(id);
  const presence = student.presence + pr;
  await Student.findByIdAndUpdate(id, { presence: presence }, { new: true });
};

router.put("/", fetchTeacher, (req, res) => {
  try {
    const allId = Object.keys(req.body);
    allId.forEach((id) => {
      takeAttendance(id, req.body[id]);
    });
    res.json({ success: "Attendance submitted successfully" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
