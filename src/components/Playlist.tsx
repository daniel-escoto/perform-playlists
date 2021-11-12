import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Tracks from "./Tracks";
import PlaylistData from "./PlaylistData";

function Playlist() {
  let playlistId = useParams().playlistId as string;

  return (
    <div>
      <PlaylistData playlistId={playlistId} />
      <Tracks playlistId={playlistId} />
    </div>
  );
}

export default Playlist;
