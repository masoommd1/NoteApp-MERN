import Note from "../models/noteModels.js";

export const apiMsg = async (req, res) => {
  res.send("api is running");
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("error at GetNotes Controller ", error);
    res.status(500).json({ message: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createNotes = async (req, res) => {
  try {
    const { title, content, isPinned, color } = req.body;

    const newNote = new Note({
      title,
      content,
      isPinned,
      color,
    });

    await newNote.save();

    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("error at CreateNotes Controller ", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, content, isPinned, color } = req.body;
    await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        isPinned,
        color,
      },
      { new: true }
    );
    if (!updateNotes)
      return res.status(404).json({ message: "Note Not Found!" });
    res.status(200).json({ message: " Notes Updated Successfully" });
  } catch (error) {
    console.error("error at UpdateNotes Controller ", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note not Found" });
    res.status(200).json({ message: "Notes Deleted Successfully" });
  } catch (error) {
    console.error("error at DeleteNotes Controller ", error);
    res.status(500).json({ message: error.message });
  }
};
