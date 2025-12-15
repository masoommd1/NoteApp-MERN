import express from "express";
import upload from "../middleware/multer.js";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  updateNotes,
  getNoteById,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);

// create note with image
router.post("/", upload.single("image"), createNotes);

// update note with optional image
router.put("/:id", upload.single("image"), updateNotes);

router.delete("/:id", deleteNotes);

export default router;
