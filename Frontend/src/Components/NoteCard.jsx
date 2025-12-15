import React from "react";
import { Link, useNavigate } from "react-router";
import {
  PenSquareIcon,
  Trash2Icon,
  CheckCircle,
  Clock,
  MoreVertical,
} from "lucide-react";
import { FormatDate } from "../../lib/Util";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  // Delete note
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error deleting note!", error);
      toast.error("Failed to delete note");
    }
  };

  // Navigate to edit page
  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/note/${note._id}`);
  };

  // Show confirmation modal for delete
  const confirmDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const modal = document.getElementById(`delete-modal-${id}`);
    if (modal) {
      modal.showModal();
    }
  };

  const isCompleted = note.status === "completed";

  return (
    <>
      <div
        className={`card bg-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 
          ${isCompleted ? "opacity-75" : ""}
          border-l-4 ${isCompleted ? "border-success" : "border-primary"}
        `}
        style={{
          borderLeftColor: !isCompleted ? note.color || "#4f46e5" : undefined,
        }}
      >
        <div className="card-body p-5">
          {/* Header with title and status */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3
                className={`card-title text-lg font-semibold ${
                  isCompleted ? "line-through" : ""
                }`}
              >
                {note.title}
                {isCompleted ? (
                  <span className="badge badge-success badge-sm ml-2">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </span>
                ) : (
                  <span className="badge badge-info badge-sm ml-2">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </span>
                )}
              </h3>
            </div>

            {/* Dropdown menu for mobile */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm btn-circle"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-5 h-5" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={`/note/${note._id}`} className="flex items-center">
                    <PenSquareIcon className="w-4 h-4" />
                    View Details
                  </Link>
                </li>
                <li>
                  <button onClick={handleEdit} className="flex items-center">
                    <PenSquareIcon className="w-4 h-4" />
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => confirmDelete(e, note._id)}
                    className="flex items-center text-error"
                  >
                    <Trash2Icon className="w-4 h-4" />
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Image */}
          {note.image && (
            <div className="mb-4 flex justify-center">
              <img
                src={`http://localhost:5000/uploads/notes/${note.image}`}
                alt={note.title}
                className="max-h-48 w-full object-cover rounded-lg border-2 border-base-300 shadow-sm"
              />
            </div>
          )}

          {/* Content */}
          <div className="mb-4">
            <p
              className={`text-base-content/80 ${
                isCompleted ? "line-through opacity-60" : ""
              }`}
            >
              {note.content.length > 150
                ? `${note.content.substring(0, 150)}...`
                : note.content}
            </p>
          </div>

          {/* Footer with date and actions */}
          <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-300">
            <div className="flex items-center gap-2">
              <span className="text-xs text-base-content/60">
                {FormatDate(new Date(note.createdAt))}
              </span>
              {note.updatedAt !== note.createdAt && (
                <span className="text-xs text-base-content/40">(Edited)</span>
              )}
            </div>

            {/* Action buttons for desktop */}
            <div className="flex items-center gap-2">
              {/* Desktop action buttons - hidden on mobile */}
              <div className="hidden sm:flex items-center gap-1">
                <button
                  className="btn btn-ghost btn-sm btn-circle text-primary"
                  onClick={handleEdit}
                  title="Edit note"
                >
                  <PenSquareIcon className="w-5 h-5" />
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-circle text-error"
                  onClick={(e) => confirmDelete(e, note._id)}
                  title="Delete note"
                >
                  <Trash2Icon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <dialog id={`delete-modal-${note._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Note</h3>
          <p className="py-4">
            Are you sure you want to delete "
            <span className="font-semibold">{note.title}</span>"? This action
            cannot be undone.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-3">
                <button className="btn btn-outline">Cancel</button>
                <button
                  className="btn btn-error"
                  onClick={(e) => handleDelete(e, note._id)}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default NoteCard;
