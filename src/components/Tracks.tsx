import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Tracks({ playlistId }: { playlistId: string }) {
  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    const updateTrackList = async () => {
      try {
        const response = await axios.get(`/api/playlists/${playlistId}`);
        setTrackList(response.data.tracks);
      } catch (error: any) {
        console.error(error);
      }
    };

    updateTrackList();
  }, []);

  return (
    <div>
      <h2>Tracks for {playlistId}</h2>
      <p>
        {trackList.length === 0
          ? "tracks are loading"
          : JSON.stringify(trackList)}
      </p>
    </div>
  );
}
export default Tracks;
