import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import signUp from "./routes/SignUp.js";
import signIn from "./routes/SignIn.js";
import getTeacher from "./routes/GetTeacher.js";
import addStudent from "./routes/AddStudents.js";
import getStudents from "./routes/GetStudents.js";
import updateStudent from "./routes/UpdateStudent.js";
import deleteStudent from "./routes/DeleteStudent.js";
import addClass from "./routes/AddClass.js";
import getClasses from "./routes/GetClasses.js";
import updateClass from "./routes/UpdateClass.js";
import deleteClass from "./routes/DeleteClass.js";
import takeAttendance from "./routes/TakeAttendance.js";

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env["mongoURI"];
mongoose.connect(mongoURI);

app.use("/signup", signUp);
app.use("/signin", signIn); 
app.use("/getteacher", getTeacher);
app.use("/addstudent", addStudent);
app.use("/getstudents", getStudents);
app.use("/updatestudent", updateStudent);
app.use("/deletestudent", deleteStudent);
app.use("/addclass", addClass);
app.use("/getclasses", getClasses);
app.use("/updateclass", updateClass);
app.use("/deleteclass", deleteClass);
app.use("/takeattendance", takeAttendance);

app.listen(3000, () => {
  console.log("Express server initialized");
});
