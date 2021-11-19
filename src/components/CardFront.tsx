import React, { useState } from "react";
import { secondsToMinuteFormat } from "../utils/utils";

import flip from "../icons/white_flip.svg";
import play from "../icons/white_play.svg";
import pause from "../icons/white_pause.svg";

import { useAudio } from "../Context/AudioContext";

function CardFront({
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
  const { setSong, pauseSong, songUrl, isPaused } = useAudio();

  const isPlaying = () => {
    return !isPaused && songUrl === track["previewUrl"];
  };

  return (
    <div className="flex flex-col relative transition ease-in-out transform hover:-translate-y-0.5 hover:scale-110 shadow-lg">
      <img
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        src={track["albumArtUrl"]}
        alt={`${track["name"]} album art`}
        className="h-36 rounded-t-lg"
        onClickCapture={() =>
          isPlaying() ? pauseSong() : setSong(track["previewUrl"])
        }
      />
      {isPlaying() ? (
        <img
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          src={pause}
          alt="pause icon"
          className={
            "h-6 w-6 absolute top-1/3 left-1/2 transform -translate-x-1/3 -translate-y-1/2 opacity-75"
          }
          onClickCapture={() =>
            isPlaying() ? pauseSong() : setSong(track["previewUrl"])
          }
        />
      ) : (
        <img
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          src={play}
          alt="play icon"
          className={`h-6 w-6 absolute top-1/3 left-1/2 transform -translate-x-1/3 -translate-y-1/2 ${
            isHovered ? "opacity-75" : "opacity-0"
          }`}
          onClickCapture={() =>
            isPlaying() ? pauseSong() : setSong(track["previewUrl"])
          }
        />
      )}

      <div className="h-24 overflow-hidden rounded-b-lg relative">
        <img
          src={track["albumArtUrl"]}
          alt="backdrop"
          className="object-fill"
        />
        <div className="absolute inset-0 backdrop-filter backdrop-blur-lg rounded-b-lg px-2 pt-2">
          <p className="text-white truncate font-semibold">{track["name"]}</p>
          <p className="text-white text-sm truncate mt-1 pr-2">
            {track["artistNames"].map((artist: string, i: number) => (
              <span key={i}>
                {i > 0 && " · "}
                {artist}
              </span>
            ))}
          </p>
          <div className="flex flex-row mt-3 justify-between">
            <p className="text-white text-sm truncate">
              {secondsToMinuteFormat(track["duration"])}
            </p>
            <img
              className="h-4 self-center"
              src={flip}
              alt="flip"
              onClick={() => FlipCard()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardFront;
