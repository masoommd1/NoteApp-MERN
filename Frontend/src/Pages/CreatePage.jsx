import { ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import NavBar from "../Components/NavBar";
import { CirclePicker } from "react-color";
import toast from "react-hot-toast";
import axios from "axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#fef08a");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();

  // Fix for hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/notes", {
        title: title.trim(),
        content: content.trim(),
        color
      });
      toast.success("Note created successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-base-200">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="skeleton h-12 w-32 mb-6"></div>
            <div className="card bg-base-100 w-full">
              <div className="card-body">
                <div className="skeleton h-8 w-48 mb-4"></div>
                <div className="skeleton h-12 w-full mb-4"></div>
                <div className="skeleton h-32 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-outline btn-success mb-6 gap-2">
            <ArrowLeft className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 text-success">
                Create New Note
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-6">
                  <fieldset className="fieldset border-base-300">
                    <legend className="fieldset-legend text-lg font-semibold">Title</legend>
                    <input
                      type="text"
                      className="input input-bordered w-full mt-2"
                      placeholder="Note Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={loading}
                    />
                  </fieldset>
                </div>
                
                <div className="form-control mb-6">
                  <fieldset className="fieldset border-base-300">
                    <legend className="fieldset-legend text-lg font-semibold">Content</legend>
                    <textarea
                      className="textarea textarea-bordered w-full h-32 mt-2 resize-none"
                      placeholder="Write your content here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      disabled={loading}
                    />
                  </fieldset>
                </div>
                
                {/* Color Picker */}
                <div className="form-control mb-6">
                  <fieldset className="fieldset border-base-300">
                    <legend className="fieldset-legend text-lg font-semibold">Choose Color</legend>
                    <div className="flex items-center gap-4 mt-2">
                      <CirclePicker
                        color={color}
                        onChangeComplete={(color) => setColor(color.hex)}
                        width="100%"
                      />
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-base-300 shadow-md"
                        style={{ backgroundColor: color }}
                      ></div>
                    </div>
                  </fieldset>
                </div>

                <div className="card-actions justify-center pt-4">
                  <button 
                    type="submit" 
                    className="btn btn-success w-48" 
                    disabled={loading || !title.trim() || !content.trim()}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating...
                      </>
                    ) : (
                      "Create Note"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;