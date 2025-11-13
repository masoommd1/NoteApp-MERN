export const getAllNotes = (req, res) => {
  try {
    res.status(200).json({ message: "Fetching Notes " });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};


export const createNotes = (req, res) => {
  try {
    res.status(200).json({ message: " Notes Created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};


export const deleteNotes = (req, res) => {
  try {
    res.status(200).json({ message: "Notes Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};



export const updateNotes = (req, res) => {
  try {
    res.status(200).json({ message: " Notes Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};
