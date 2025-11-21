import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import NavBar from "../Components/NavBar";
// import axios from 'axios';
import toast from "react-hot-toast";
import { FaceNormalsHelper } from "ogl";
import api from "../../lib/axios";
import { ArrowLeft, LoaderIcon, TrashIcon } from "lucide-react";
import { CirclePicker } from "react-color";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("erron fecthing notes", error);
        toast.error("Failed to Fetch Note");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [id]);
  // whenever id changes run above use effect

  console.log({ note });

   const handleDelete = async()=>{
    // e.preventDefault() //get rid of navigation behaviour
    if(!window.confirm("Are you sure want to Delete this Note.. ?")) return;
    try {
        await api.delete(`/notes/${id}`)
        toast.success("Notes Deletd")
        navigate("/")
    } catch (error) {
      console.log("Error deleting note!",error)
      toast.error("Failed to delete note")
    }
  } 
  const handleSave = async() => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please Add Title and Content.")
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`,note);
      toast.success("Note updated SuccessFully")
      navigate("/")
    } catch (error) {
      console.log("error saving note",error);
      toast.error("Failed to update note")
      
    }finally{
      setSaving(false)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderIcon className="animate-spin size-10 text-success" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-outline btn-success">
            <ArrowLeft className="size-5" />
            Back to Notes
          </Link>

          <button onClick={handleDelete} className="btn btn-error btn-outline">
            <TrashIcon className="h-5 w-5" />
            Delete Note
          </button>
        </div>
        <div className="card bg-base-100/50">
          <fieldset className="fieldset border-2 border-base-300 rounded-lg p-4 bg-base-200/50">
            <legend className="fieldset-legend text-lg font-semibold px-2">
              Title
            </legend>
            <input
              type="text"
              className="input input-bordered w-full mt-3 focus:input-primary transition-colors"
              placeholder="Note Title"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </fieldset>
          <div className="form-control">
            <fieldset className="fieldset border-2 border-base-300 rounded-lg p-4 bg-base-200/50">
              <legend className="fieldset-legend text-lg font-semibold px-2">
                Content
              </legend>
              <textarea
                type="text"
                className="textarea textarea-bordered w-full h-32 mt-3 focus:textarea-primary transition-colors resize-none"
                placeholder="Write Your Content Here..."
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </fieldset>
          </div>
        </div>
        {/* color picker */}
        <div className="flex items-center gap-4 p-4 border-2 border-base-300 rounded-lg bg-base-200/50">
          <label className="font-semibold text-lg whitespace-nowrap">
            Choose Color:
          </label>
          <div className="flex-1">
            <CirclePicker
              color={note.color}
              onChangeComplete={(c) => setNote({ ...note, color: c.hex })}
              width="100%"
            />
          </div>
          <div
            className="w-12 h-12 rounded-lg border-2 border-base-300 shadow-md transition-all"
            style={{ backgroundColor: note.color }}
          ></div>
        </div>
        <div className="card-actions justify-center pt-4">
          <button
            className="btn btn-outline btn-success"
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
