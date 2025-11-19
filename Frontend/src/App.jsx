import React from "react";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import NoteDetailPage from "./Pages/NoteDetailPage";
import { Route, Routes } from "react-router";
import Particles from "../Particles/Particles";
// import DotGrid from "../DotGrid/DotGrid";
// import toast from 'react-hot-toast'

const App = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Particles />
      </div>

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};


export default App;
