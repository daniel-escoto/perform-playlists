import {
  getBarStyles,
  getPlaylistIntensity,
  getTempoRange,
  getAveragePace,
  getAverageHeartrate,
} from "../utils/utils";

function Stats({
  playlistData,
  userData,
}: {
  playlistData: any;
  userData: any;
}) {
  const playlistIntensity = getPlaylistIntensity(playlistData);

  return (
    <ul className="bg-gradient-to-br from-red-500 to-pink-500 m-3 max-w-md mx-auto rounded-md grid grid-cols-2 gap-8 py-6 px-6 md:my-5 md:max-w-xl lg:max-w-4xl lg:grid-cols-4">
      <li className="flex flex-col">
        <p className="text-white text-center italic font-extrabold text-xl mb-2">
          Intensity
        </p>
        <div className="h-16 w-16 pb-4 flex flex-row space-x-1 self-center justify-center bg-white rounded-full border-gray-200">
          <div
            className={`h-3 w-2.5 self-end border  ${
              getBarStyles(playlistIntensity)[0]
            }`}
          ></div>
          <div
            className={`h-5 w-2.5 self-end border  ${
              getBarStyles(playlistIntensity)[1]
            }`}
          ></div>
          <div
            className={`h-8 w-2.5 self-end border  ${
              getBarStyles(playlistIntensity)[2]
            }`}
          ></div>
        </div>
      </li>

      <li className="flex flex-col items-center">
        <p className="text-white text-center italic font-extrabold text-xl mb-5">
          Tempo
        </p>
        <p className="text-white text-center font-extrabold text-3xl">
          {getTempoRange(playlistData)}
        </p>
      </li>

      <li className="flex flex-col items-center">
        <p className="text-white text-center italic font-extrabold text-xl mb-5">
          Pace
        </p>
        <p className="text-white text-center font-extrabold text-3xl">
          ~{getAveragePace(userData)}
        </p>
        <p className="text-white text-center font-extrabold text-sm">
          min/mile
        </p>
      </li>

      <li className="flex flex-col items-center">
        <p className="text-white text-center italic font-extrabold text-xl mb-5">
          Heartrate
        </p>
        <p className="text-white text-center font-extrabold text-3xl">
          ~{getAverageHeartrate(userData)}
        </p>
        <p className="text-white text-center font-extrabold text-sm">bpm</p>
      </li>
    </ul>
  );
}

export default Stats;
