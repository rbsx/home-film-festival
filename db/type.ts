type Film = {
  id: string;
  track_id: string;
  title: string;
  year: number;
  director: string | null;
  runtime_minutes: number | null;
  tags: string[] | null;
  logline: string | null;
  poster_url: string | null;
};

type TrackWithFilms = {
  id: string;
  name: string;
  description: string | null;
  vibe_blurb: string | null; // if you added it
  films: Film[];
};
type Data = { tracks: TrackWithFilms[] };

export type { Data, Film, TrackWithFilms };
