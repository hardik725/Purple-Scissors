import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Age: { type: Number, required: true },
  Place: { type: String, required: true },
  PhoneNumber: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", UserSchema);

export default User;
