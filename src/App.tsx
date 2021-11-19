import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Playlist from "./components/Playlist";
import Home from "./components/Home";

import { AudioProvider } from "./Context/AudioContext";

export default function App() {
  return (
    <AudioProvider>
      <Router>
        <div>
          <Routes>
            <Route path=":playlistId" element={<Playlist />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AudioProvider>
  );
}
