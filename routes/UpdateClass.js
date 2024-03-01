import express from "express";
import Class from "../models/Classes.js";
import fetchTeacher from "../middleware/FetchTeacher.js";

const router = express.Router();

router.put("/:classid", fetchTeacher, async (req, res) => {
  try {
    const classes = await Class.findById(req.params.classid);
    if (!classes) {
      return res.status(404).json({ error: "Class not found" });
    }
  } catch {
    return res.status(404).json({ error: "Invalid class id" });
  }
  try {
    const update = {};
    if (req.body.name) {
      update.name = req.body.name;
    }
    update.access = req.body.access ? "only me" : "all";
    await Class.findByIdAndUpdate(req.params.classid, update, {
      new: true,
    });
    res.json({ success: "Class updated successfully" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
