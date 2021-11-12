import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PlaylistData({ playlistId }: { playlistId: string }) {
  return (
    <div>
      <h2>Data for {playlistId}</h2>
    </div>
  );
}
export default PlaylistData;
