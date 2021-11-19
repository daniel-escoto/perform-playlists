import React, { useState, useEffect } from "react";

import Spotify from "../icons/white_spotify.svg";
import iTunes from "../icons/white_itunes.svg";
import { getSpotifyUrl, getAMUrl, getAMToken } from "../utils/utils";

function CardBack({
  track,
  FlipCard,
  isHovered,
  setIsHovered,
}: {
  track: any;
  FlipCard: Function;
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [appleMusicUrl, setAppleMusicUrl] = useState("");

  useEffect(() => {
    const updateAppleMusicURL = async () => {
      try {
        setAppleMusicUrl(await getAMUrl(track["appleTrackUrn"]));
      } catch (error: any) {
        console.error(error);
      }
    };

    updateAppleMusicURL();
  }, []);

  return (
    <div
      className="h-60 bg-gray-400 rounded-lg flex flex-col justify-around transition ease-in-out transform hover:-translate-y-0.5 hover:scale-110 hover:shadow-md"
      onClick={() => FlipCard()}
    >
      <div>
        <p className="text-white text-center font-extralight">Tempo</p>
        <p className="text-white text-center italic font-extrabold text-3xl">
          {Math.round(track["songTempo"])}
        </p>
      </div>

      <div>
        <p className="text-white text-center font-extralight">Intensity</p>
        <p className="text-white text-center italic font-extrabold text-3xl">
          {track["intensity"]}
        </p>
      </div>
      <div className="flex justify-around px-2">
        <a
          onClick={(e) => e.stopPropagation()}
          href={getSpotifyUrl(track["spotifyTrackUrn"])}
          target="_blank"
        >
          <img
            className="h-10 opacity-75 hover:opacity-100"
            src={Spotify}
            alt="spotify"
          />
        </a>
        <a
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={appleMusicUrl}
          target="_blank"
        >
          <img
            className="h-10 flex-shrink-0 opacity-75 hover:opacity-100"
            src={iTunes}
            alt="spotify"
          />
        </a>
      </div>
    </div>
  );
}

export default CardBack;
