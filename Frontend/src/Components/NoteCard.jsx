import React from "react";
import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { FormatDate } from "../../lib/Util";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note,setNotes }) => {

  const handleDelete = async(e,id)=>{
    e.preventDefault() //get rid of navigation behaviour
    if(!window.confirm("Are you sure want to Delete this Note.. ?")) return;
    try {
        await api.delete(`/notes/${id}`)
        setNotes((prev)=>prev.filter((note)=>note._id !==id)) //get rid of deleted notes from ui
        toast.success("Notes Deletd Succesfully")
    } catch (error) {
      console.log("Error deleting notes!",error)
      toast.error("Failed to delete note")
    }
  } 

  return (
    <Link
      to={`/note/${note.id}`}
      className="card  transition-all hover:shadow-lg duration-200 border-t-4 border-solid border-success"
      style={{ backgroundColor: note.color || "#455a64" }}
    >
      <div className="card-body rounded-md h-[220px] ">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60 font-bold  ">
            {FormatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-6" />
            <button className="btn-ghost btn-xs text-error cursor-pointer " onClick={(e)=>handleDelete(e,note._id)}>
              <Trash2Icon className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
