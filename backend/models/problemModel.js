import mongoose from "mongoose";

//problem schema
const problemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    trim: true,
  },
  problem_link: {
    type: String,
    required: true,
  },
  plateform: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  showAgainAt: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setDate(date.getDate() + 20);
      return date;
    },
  },
});

export const Problems = new mongoose.model("Problems", problemSchema);
