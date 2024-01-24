import mongoose from "mongoose";

const classesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teachers",
    required: true,
  },
  access: {
    type: String,
    default: "only me",
  },
});

const Class = mongoose.model("classes", classesSchema);
Class.createIndexes();
export default Class;
