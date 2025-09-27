import { Film, TrackWithFilms } from "../db/type.ts";
import { Skeleton } from "../components/Skeleton.tsx";

export const Track = ({ track, selectedIndexes, setSelectedIndexes }: { track: TrackWithFilms, selectedIndexes: string[], setSelectedIndexes: (args:{index: number, id: string}) => void }) => {
  const isFilmSelected = (id: string) => {
    return selectedIndexes.includes(id);
  }

  const isIndexSelected = (index: number) => {
    return selectedIndexes.at(index);
  }

  const setSelectedFilm = (film: Film, index: number) => {
    if (selectedIndexes.at(index)) {
      return;
    }

    setSelectedIndexes({index, id: film.id});
  }

  const simpleHash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
          hash = (hash * 31 + str.charCodeAt(i)) % 100;
      }
      return hash;
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-[200px_3fr] p-[2svw] mx-auto relative">
      <h2 class="text-2xl font-bold mb-2 max-md:sticky top-0 z-[51] bg-white">{track.name}</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl auto-rows-fr">
        {track.films.map((film: Film, index: number) => (
          <button
            type="button"
            key={film.id}
            onClick={() => setSelectedFilm(film, index)}
            class={`
              bg-gray-200 rounded-lg p-4 relative 
              overflow-hidden z-50 inset-0 transform-gpu 
              w-full min-h-[300px] h-full
              [transform-style:preserve-3d] 
              ${isFilmSelected(film.id) ? "animate-flip-y" : "animate-unflip-y"}
              ${isIndexSelected(index) && !(isFilmSelected(film.id)) ? "grayscale" : ""}
            `}
          >
            <img
              src={film.poster_url ?? ""}
              alt={film.title}
              class={`absolute bottom-0 left-0 -z-0 w-full h-full object-cover object-center ${isFilmSelected(film.id) ? "blur-[1px] [transform:rotateY(180deg)]" : "blur-xl"}`}
            />
            <div class={`
              h-full relative z-10 grid grid-cols-1 grid-rows-[auto_1fr_1fr_auto] gap-4 
              content-between ${isFilmSelected(film.id) ? "[transform:rotateY(180deg)]" : ""}
                  `}>
              
                {isFilmSelected(film.id) ? (
                    <>
                      <h2 class="text-lg font-bold text-amber-500 text-shadow-black inline-flex gap-1 flex-wrap justify-start">{film.title}</h2>
                      <div class="flex justify-start"><span className='bg-amber-100 px-2 py-1 content-start h-fit text-xs font-thin'>dir: {film.director}</span></div>
                      <div class="flex flex-col gap-2">
                        <p class="text-sm text-white/80 font-thin bg-black/20 p-2 rounded">{film.logline}</p>
                      </div>
                      <div class="mt-auto"><span class="text-xs text-amber-500 bg-black/20 font-thin p-2 rounded">{film.year} / {film.runtime_minutes} minutes</span></div>
                    </>
                ) : (
                    <>
                        <h2 class="text-2xl font-bold inline-flex gap-1 flex-wrap justify-start">{film.title.split(" ").map((_w, i) => <Skeleton key={`${film.id}-${i}`} className="w-10 h-6 !bg-amber-500" />)}</h2>
                        <div class="text-xs text-slate-600 font-thin gap-1 flex flex-row flex-wrap justify-evenly min-h-[40px] content-start">
                            {film.tags?.map((tag) => {
                                const deg = simpleHash(tag) % 10;
                                const sign = simpleHash(tag) % 2 === 0 ? '-' : '';
                                return (
                                    <span key={tag}
                                        style={{ transform: `rotate(${sign}${deg}deg)` }}
                                        class={`bg-amber-100 px-2 py-1 content-center h-fit`}>{tag}</span>
                                );
                            })}
                        </div>
                        <p class="text-sm text-black font-thin p-2 bg-white/40 rounded">{`${film.logline}`}</p>
                        <div class="mt-auto"><span class="text-xs text-amber-500 bg-black/20 font-thin p-2 rounded">{film.year} / {film.runtime_minutes} minutes</span></div>
                    </>
                )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
