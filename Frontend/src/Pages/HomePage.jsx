import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import RateLimitedUI from "../Components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../Components/NoteCard";
import api from "../../lib/axios";
import NotesNotFound from "../Components/NotesNotFound";


const HomePage = () => {
  const [isRateLimited, setIsrateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // get from axios.js page 
        const res = await api.get("/notes");
        // const data = await res.json()
        console.log(res.data);
        setNotes(res.data);
        setIsrateLimited(false);
      } catch (error) {
        console.log("error fetching notes", error);
        if (error.response.status === 429) {
          setIsrateLimited(true);
        } else {
          toast.error("failed to  load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen  text-base-content">
      <NavBar />
      
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center  text-success text-2xl py-10">
            Loading Content...
            <span className="loading loading-spinner text-success"></span>
          </div>
        )}

        {notes.length === 0 && !isRateLimited && <NotesNotFound/>}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
            {notes.map((note) => (
              <div>
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
