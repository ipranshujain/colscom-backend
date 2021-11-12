import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

const app = express.Router();
app.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({ status: false, message: "All input is required" });
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "12h",
        }
      );

      // save user token
      user.token = token;
      // user
      return res.status(200).json(user);
    }
    res.status(400).json({ status: false, message: "Invalid Credentials" });
  } catch (error) {
    res.status(400).json({ status: false, message: "Invalid Credentials" });
    console.log("Error ", error);
  }
});
app.route("/verify-token").post(auth, async (req, res) => {
  return res.json({ status: true, message: "Token is verified." });
});
app.route("/register").post(async (req, res) => {
  try {
    const { name, email, password, adminEmail, adminPassword } = req.body;

    if (!(email && password && name && adminPassword && adminEmail)) {
      res.status(400).send("All input is required");
    }

    const adminUser = await User.findOne({ email: adminEmail });
    if (
      adminUser &&
      (await bcrypt.compare(adminPassword, adminUser.password))
    ) {
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const user = await User.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "12h",
        }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json(user);
    } else {
      res
        .status(400)
        .json({ status: false, message: "Details doesn't match as per need." });
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: false, message: "Details doesn't match as per need." });
    console.log(err);
  }
  // Our register logic ends here
});

export default app;
