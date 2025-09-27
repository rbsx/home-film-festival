import { useSignal } from "@preact/signals";
import { TrackWithFilms } from "../db/type.ts";
import { Track } from "./Track.tsx";

export const Dashboard = ({tracks}: {tracks: TrackWithFilms[]}) => {
    const selectedIndexes = useSignal<number[]>([]);
    const setSelectedIndexes = (index: number) => {
        selectedIndexes.value = [...selectedIndexes.value, index];
    };


  return <>
    {tracks.map((track: TrackWithFilms) => (
        <Track key={`track-${track.id}`} selectedIndexes={selectedIndexes.value} setSelectedIndexes={(index: number) => setSelectedIndexes(index)} track={track} />
    ))}
  </>
};