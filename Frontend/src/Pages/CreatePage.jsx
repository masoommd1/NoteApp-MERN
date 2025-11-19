import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import NavBar from "../Components/NavBar";
import { ChromePicker, CirclePicker, SketchPicker } from "react-color";
import toast from "react-hot-toast";
import api from "../../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);

    if (!title.trim() || !content.trim()) {
      toast.error("All Fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
        color,
      });
      toast.success("Note Created Successfully");
      navigate("/");
    } catch (error) {
      console.log("Error at Creating Notes", error);
      if(error.response.status === 429){
        console.log("Slow Down, You are creating Notes Too Fast!",{
          duration:4000,
          icon:"💀"
        });
      }else{

        toast.error("Failed to create notes");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <NavBar />
      <div className="container mx-auto px-4 py-8 ">
        <div className="max-w-2xl mx-auto ">
          <Link to={"/"} className="btn btn-outline btn-success mb-6">
            <ArrowLeft className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-200 w-2xl">
            <div className="card-body p-8 space-y-6 w-full max-w-none">
              <h2 className="card-title text-3xl mb-2 text-success font-bold">
                Create New Note
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <fieldset className="fieldset border-2 border-base-300 rounded-lg p-4 bg-base-200/50">
                    <legend className="fieldset-legend text-lg font-semibold px-2">
                      Title
                    </legend>
                    <input
                      type="text"
                      className="input input-bordered w-full mt-3 focus:input-primary transition-colors"
                      placeholder="Note Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </fieldset>
                </div>
                <div className="form-control">
                  <fieldset className="fieldset border-2 border-base-300 rounded-lg p-4 bg-base-200/50">
                    <legend className="fieldset-legend text-lg font-semibold px-2">
                      Content
                    </legend>
                    <textarea
                      type="text"
                      className="textarea textarea-bordered w-full h-32 mt-3 focus:textarea-primary transition-colors resize-none"
                      placeholder="Write Your Content Here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </fieldset>
                </div>
                {/* color picker */}
                <div className="flex items-center gap-4 p-4 border-2 border-base-300 rounded-lg bg-base-200/50">
                  <label className="font-semibold text-lg whitespace-nowrap">
                    Choose Color:
                  </label>
                  <div className="flex-1">
                    <CirclePicker
                      color={color}
                      onChangeComplete={(c) => setColor(c.hex)}
                      width="100%"
                    />
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-base-300 shadow-md transition-all"
                    style={{ backgroundColor: color }}
                  ></div>
                </div>

                <div className="card-actions justify-center pt-4">
                  <button
                    type="submit"
                    className="btn btn-success px-8 min-w-32"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm"></span>
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
