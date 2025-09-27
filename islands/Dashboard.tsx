import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { TrackWithFilms } from "../db/type.ts";
import { Track } from "./Track.tsx";

const STORAGE_KEY = "hff-selected-indexes";

export const Dashboard = ({tracks}: {tracks: TrackWithFilms[]}) => {
    const selectedIndexes = useSignal<string[]>([]);
    
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsedData = JSON.parse(saved);
                if (Array.isArray(parsedData)) {
                    selectedIndexes.value = parsedData;
                }
            }
        } catch (error) {
            console.warn("Failed to load selectedIndexes from sessionStorage:", error);
        }
    }, []);
    
    const setSelectedIndexes = ({index, id}: {index: number, id: string}) => {
        const newValue = [...selectedIndexes.value];
        newValue[index] = id;
        selectedIndexes.value = newValue;
        
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
        } catch (error) {
            console.warn("Failed to save selectedIndexes to sessionStorage:", error);
        }
    };


  return <>
    {tracks.map((track: TrackWithFilms) => (
        <Track key={`track-${track.id}`} selectedIndexes={selectedIndexes.value} setSelectedIndexes={setSelectedIndexes} track={track} />
    ))}
  </>
};