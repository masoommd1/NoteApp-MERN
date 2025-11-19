import express from 'express';
import { createNotes, deleteNotes, getAllNotes, updateNotes,getNoteById } from '../controllers/notesController.js';

const Router = express.Router();

Router.get("/", getAllNotes)
Router.get("/:id", getNoteById) 
Router.post("/", createNotes)
Router.put("/:id", updateNotes)
Router.delete("/:id", deleteNotes)

export default Router;