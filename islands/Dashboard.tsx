import { useSignal } from "@preact/signals";
import { TrackWithFilms } from "../db/type.ts";
import { Track } from "./Track.tsx";

export const Dashboard = ({tracks}: {tracks: TrackWithFilms[]}) => {
    const selectedIndexes = useSignal<string[]>([]);
    const setSelectedIndexes = ({index, id}: {index: number, id: string}) => {
        const newValue = [...selectedIndexes.value]
        newValue[index] = id;
        selectedIndexes.value = newValue;
    };


  return <>
    {tracks.map((track: TrackWithFilms) => (
        <Track key={`track-${track.id}`} selectedIndexes={selectedIndexes.value} setSelectedIndexes={(index: number) => setSelectedIndexes(index)} track={track} />
    ))}
  </>
};