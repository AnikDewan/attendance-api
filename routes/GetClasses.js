import express from "express";
import fetchTeacher from "../middleware/FetchTeacher.js";
import Class from "../models/Classes.js";

const router = express.Router();

router.get("/", fetchTeacher, async (req, res) => {
  try {
    const CLASS = await Class.find({
      $or: [
        { $and: [{ access: "only me" }, { teacher: req.teacher.id }] },
        { access: "all" },
      ],
    });
    res.json(CLASS);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
