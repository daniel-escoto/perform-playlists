import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Playlist from "./components/Playlist";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path=":playlistId" element={<Playlist />} />
        </Routes>
      </div>
    </Router>
  );
}
