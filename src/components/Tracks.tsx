import React, { useEffect, useState } from "react";
import axios from "axios";

import TrackCard from "./TrackCard";

function NewTracks({ playlistData }: { playlistData: any }) {
  return (
    <div className="grid grid-cols-2  gap-6 py-6 px-6 max-w-md mx-auto md:grid-cols-3 md:max-w-2xl lg:grid-cols-4 lg:max-w-4xl lg:mt-12">
      {playlistData.map((track: any, index: number) => (
        <TrackCard key={index} track={track} />
      ))}
    </div>
  );
}
export default NewTracks;
