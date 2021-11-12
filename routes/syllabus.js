import express from "express";
import mongoose from "mongoose";
import Syllabus from "../models/syllabus.js";
import auth from "../middleware/auth.js";

const app = express.Router();
function updateSyllabus({ _id, branch, semester, link }) {
  Syllabus.findById(_id).then((syllabus) => {
    syllabus.branch = branch;
    syllabus.link = link;
    syllabus.semester = semester;

    syllabus
      .save()
      .then(() => {
        res.json({ status: true, message: "Updated Successfully." });
      })
      .catch((error) => {
        console.log("Error ", error);
        res
          .status(400)
          .json({ status: false, message: "Can't Update due to some error." });
      });
  });
}
app.route("/add-syllabus").post(auth, async (req, res) => {
  const { branch, semester, link } = req.body;
  try {
    const element = await Syllabus.findOne({ branch, semester });
    if (element) {
      await updateSyllabus({ _id: element._id, branch, semester, link });
      return;
    }
    const newSyllabus = new Syllabus({
      branch,
      semester,
      link,
    });
    await newSyllabus.save();
    res.json({ success: true });
  } catch (error) {
    console.log("Following error occured: ", error);
    res.json({ success: false });
  }
});
app.route("/all-syllabus").get((req, res) => {
  Syllabus.find()
    .then((syllabus) => {
      res.json(syllabus);
    })
    .catch((error) => {
      res.status(400).json({ status: false, message: "Some error occured." });
      console.log("Error is: ", error);
    });
});
app.route("/update-syllabus/:_id").post(auth, (req, res) => {
  const { link, branch, semester } = req.body;
  Syllabus.findById(req.params._id).then((syllabus) => {
    syllabus.branch = branch;
    syllabus.link = link;
    syllabus.semester = semester;

    syllabus
      .save()
      .then(() => {
        res.json({ status: true, message: "Updated Successfully." });
      })
      .catch((error) => {
        console.log("Error ", error);
        res
          .status(400)
          .json({ status: false, message: "Can't Update due to some error." });
      });
  });
});
app.route("/:_id").get((req, res) => {
  Syllabus.findById(req.params._id)
    .then((syllabus) => {
      res.json(syllabus);
    })
    .catch((error) => {
      console.log("Error ", error);
      res.status(400).json({ status: "Error" });
    });
});

app.route("/:_id").delete(auth, (req, res) => {
  Syllabus.findByIdAndDelete(req.params._id)
    .then(() => {
      res.json({ status: true, message: "Successfully Deleted." });
    })
    .catch((error) => {
      console.log("Error ", error);
      res.json({
        status: false,
        message: "Some error occured while deleting.",
      });
    });
});
export default app;
