import express from 'express';
import { createNotes, deleteNotes, getAllNotes, updateNotes } from '../controllers/notesController.js';

const Router = express.Router();

Router.get("/", getAllNotes)
Router.post("/", createNotes)
Router.put("/:id", updateNotes)
Router.delete("/:id", deleteNotes)

export default Router;