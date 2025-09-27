import { Handlers, HandlerContext, PageProps } from "$fresh/server.ts";
import { Data, TrackWithFilms } from "../db/type.ts";
import { supabaseAdmin } from "../db/index.ts";
import { Dashboard } from "../islands/Dashboard.tsx";

export const handler: Handlers<Data> = {
  async GET(_req: Request, ctx: HandlerContext<Data>) {
    const { data, error } = await supabaseAdmin
      .from("tracks")
      .select(`
        id, name, description,
        films:films (
          id, track_id, title, year, director, runtime_minutes, tags, logline, poster_url
        )
      `)
      .order("name");

    if (error) return new Response(error.message, { status: 500 });
    return ctx.render({ tracks: (data ?? []) as TrackWithFilms[] });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const { tracks } = data;

  return (
    <div class="min-h-screen relative">
      <div class="flex flex-col items-center justify-center">
        <h1 class="font-stretch-150% font- m-0 p-0 leading-none text-[calc(max(7svw,2.2rem))] max-w-full text-nowrap font-bold overflow-hidden text-center antialiased md:subpixel-antialiased">
          HOME FILM FESTIVAL
        </h1>
        <p class="text-[2.5svw] bg-amber-500 py-2 px-4 text-white font-thin -mt-[3svw] text-shadow-current tracking-widest antialiased md:subpixel-antialiased">
          Autumn 2025
        </p>

        <main className="grid grid-cols-1 grid-rows-3 gap-4 w-full my-4">
          <Dashboard tracks={tracks} />
        </main>
      </div>
    </div>
  );
}
