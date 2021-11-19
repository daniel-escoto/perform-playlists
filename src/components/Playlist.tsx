import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Stats from "./Stats";
import Tracks from "./Tracks";

import userData from "../data/userData.json";

function Playlist() {
  let playlistId = useParams().playlistId as string;

  const [playlistData, setPlaylistData] = useState([]);

  useEffect(() => {
    const updatePlaylistData = async () => {
      try {
        const response = await axios.get(`/api/playlists/${playlistId}`, {
          baseURL:
            "https://fast-taiga-47716.herokuapp.com/https://api.perform.fm",
        });
        setPlaylistData(response.data.tracks);
      } catch (error: any) {
        console.error(error);
      }
    };

    updatePlaylistData();
  }, []);

  return (
    <div>
      <Stats playlistData={playlistData} userData={userData} />
      <Tracks playlistData={playlistData} />
    </div>
  );
}

export default Playlist;
