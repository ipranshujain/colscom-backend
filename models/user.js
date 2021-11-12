import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, default: null, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
});
const User = mongoose.model("user", userSchema);
export default User;
