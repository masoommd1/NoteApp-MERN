import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import NavBar from "../Components/NavBar";
// import axios from 'axios';
import toast from "react-hot-toast";
import { FaceNormalsHelper } from "ogl";
import api from "../../lib/axios";
import { LoaderIcon } from "lucide-react";

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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderIcon className="animate-spin size-10 text-success" />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      NoteDetailPage
    </div>
  );
};

export default NoteDetailPage;
