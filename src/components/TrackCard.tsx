import React, { useState } from "react";
import ReactCardFlip from "@descoto/react-card-flip";

import CardFront from "./CardFront";
import CardBack from "./CardBack";

function TrackCard({ track }: { track: any }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function flipCard(e: Event) {
    setIsFlipped(!isFlipped);
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <CardFront
        track={track}
        FlipCard={flipCard}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
      />
      <CardBack
        track={track}
        FlipCard={flipCard}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
      />
    </ReactCardFlip>
  );
}

export default TrackCard;
