import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String, // e.g. "#FFD700" or a Tailwind color name
      default: "#000",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed"],
    },
    image: {
      type: String, // store image filename or path
      default: null,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
