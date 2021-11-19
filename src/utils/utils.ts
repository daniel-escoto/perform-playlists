// import { Client } from "@yujinakayama/apple-music";
import axios from "axios";
import jwt from "jsonwebtoken";

export function secondsToMinuteFormat(time: number): string {
  const minutes = Math.floor(time / 60);
  let seconds = (time - minutes * 60).toString();

  if (seconds.length === 1) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

export function minutestoSecondFormat(time: string): number {
  const timeSegments = time.split(":");
  const minute = +timeSegments[0];
  const seconds = +timeSegments[1];

  return minute * 60 + seconds;
}

export function getSpotifyUrl(spotifyTrackUrn: string): string {
  const urnSegments = spotifyTrackUrn.split(":");
  const trackId = urnSegments[urnSegments.length - 1];

  return `https://open.spotify.com/track/${trackId}`;
}

export function getAMToken(): string {
  // TODO: hide privateKey, teamID, and keyID

  const privateKey = process.env.REACT_APP_PRIVATEKEY as string;

  const teamID = process.env.REACT_APP_TEAMID as string;
  const keyID = process.env.REACT_APP_KEYID as string;

  const jwtToken = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: "180d",
    issuer: teamID,
    header: {
      alg: "ES256",
      kid: keyID,
    },
  });

  return jwtToken;
}

export async function getAMUrl(appleMusicTrackUrn: string): Promise<any> {
  const token = getAMToken();

  const urnSegments = appleMusicTrackUrn.split(":");
  const trackId = urnSegments[urnSegments.length - 1];

  try {
    const response = await axios.get(`/${trackId}`, {
      baseURL: "https://api.music.apple.com/v1/catalog/us/songs",
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data[0].attributes.url;
  } catch (error) {
    console.log(error);
  }
}

export function getBarStyles(intensity: number | undefined) {
  let barColors = [];

  switch (intensity) {
    case 25:
      barColors = ["bg-green-500", "bg-white", "bg-white"];
      break;
    case 50:
      barColors = ["bg-yellow-300", "bg-yellow-300", "bg-white"];
      break;
    case 75:
      barColors = ["bg-red-500", "bg-red-500", "bg-red-500"];
      break;
    default:
      barColors = ["bg-gray-300", "bg-gray-300", "bg-gray-300"];
  }

  return barColors;
}

export function getPlaylistIntensity(playlistData: any[]): number {
  if (playlistData.length === 0) return 0;

  const intensities = playlistData.map((song) => +song.intensity);

  const averageIntensity =
    intensities.reduce((a, b) => a + b) / intensities.length;

  const intensityOptions = [25, 50, 75];

  return intensityOptions.reduce(function (prev, curr) {
    return Math.abs(curr - averageIntensity) < Math.abs(prev - averageIntensity)
      ? curr
      : prev;
  });
}

export function getTempoRange(playlistData: any[]): string {
  if (playlistData.length === 0) return "...";

  let tempos = playlistData.map((song) => song.songTempo);

  tempos.sort();

  const maxTempo = Math.round(tempos[0]);
  const minTempo = Math.round(tempos[tempos.length - 1]);

  return `${minTempo}-${maxTempo}`;
}

export function getAveragePace(userData: any[]): string {
  if (userData.length === 0) return "...";

  const secondsPerMile = userData.map((user) =>
    minutestoSecondFormat(user.pace)
  );

  let averageSecondsPerMile =
    secondsPerMile.reduce((a, b) => a + b) / secondsPerMile.length;

  averageSecondsPerMile = Math.round(averageSecondsPerMile);

  return secondsToMinuteFormat(averageSecondsPerMile);
}

export function getAverageHeartrate(userData: any[]): string {
  if (userData.length === 0) return "...";

  const heartrates = userData.map((user) => user.avg_heartrate);

  let averageHeartrate = heartrates.reduce((a, b) => a + b) / heartrates.length;

  averageHeartrate = Math.round(averageHeartrate);

  return averageHeartrate.toString();
}
