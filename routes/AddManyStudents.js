import express from "express";
import Student from "../models/Students.js";
import Class from "../models/Classes.js";
import fetchTeacher from "../middleware/FetchTeacher.js";

const router = express.Router();

router.post("/:classid", fetchTeacher, async (req, res) => {
  try {
    const classes = await Class.findById(req.params.classid);
    if (!classes) {
      return res.status(404).json({ error: "Class not found" });
    }
  } catch {
    return res.status(404).json({ error: "Invalid class id" });
  }
  try {
    req.body.forEach(async (std) => {
      await Student.create({
        name: std.name,
        roll: std.roll,
        sec: req.params.classid,
      });
    });

    res.json({ success: "All students are added successfully" });
  } catch {
    res.status(400).json({ error: "Insufficient information" });
  }
});

export default router;
