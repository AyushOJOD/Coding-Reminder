import mongoose from "mongoose";

//user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problems",
    },
  ],
});

export const User = new mongoose.model("User", userSchema);
