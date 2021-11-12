import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

import BlogRouter from "./routes/blog.js";
import SyllabusRouter from "./routes/syllabus.js";
import BookRouter from "./routes/book.js";
import AuthRouter from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// used to access static files like images, css files etc.
// app.use(express.static(path.resolve() + "/public"));
app.use(express.static(path.join(path.resolve(), "./client/build")));

app.use("/blog", BlogRouter);
app.use("/syllabus", SyllabusRouter);
app.use("/book", BookRouter);
app.use("/auth", AuthRouter);
const uri = process.env.CONNECTION_URL || "mongodb://localhost/colscom";
mongoose
  .connect(uri, { useNewUrlParser: true })
  .catch((err) => console.log(err));
mongoose.connection.once("open", () => {
  console.log("Successfully connected to mongodb database!");
});
app.get("/fun", (req, res) => {
  res.json({ pranshu: "jain" });
});

// to direct any route to react builded folder's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "./client/build/index.html"));
});
// for starting server.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
