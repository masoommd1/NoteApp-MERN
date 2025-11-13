import express from 'express';
import { createNotes, deleteNotes, getAllNotes, updateNotes } from '../controllers/notesController.js';

const Router = express.Router();

Router.get("/", getAllNotes)
Router.post("/", createNotes)
Router.put("/:id", deleteNotes)
Router.delete("/:id", updateNotes)

export default Router;