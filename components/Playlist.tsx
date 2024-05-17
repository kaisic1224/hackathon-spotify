import type { artist, track } from "../lib/api.d";
import { Reorder, motion } from "framer-motion";
import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  createContext,
} from "react";
import {
  FaArrowDown,
  FaItunesNote,
  FaLock,
  FaLockOpen,
  FaPlus,
} from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import {
  IoMdClose,
  IoMdCloseCircle,
  IoMdOptions,
  IoMdVolumeHigh,
} from "react-icons/io";
import PlaylistSong from "./PlaylistSong";
import AddImage from "./AddImage";
import DoubleSlider from "./DoubleSlider";
import { Analysis } from "../lib/useFetch";

interface Filters {
  artists: artist[];
  genres: string[];
  tracks: track[];
}

interface RecomendContext {
  filters: Filters;
  recommended: track[];
  analyses: Analysis;
}

export const RecommendedContext = createContext<RecomendContext | null>(null);

const Playlist = ({
  analyses,
  items,
  setRecommended,
  artists,
  topTracks,
}: {
  analyses: Analysis
  items: track[];
  setRecommended: Dispatch<SetStateAction<track[]>>;
  artists: artist[];
  topTracks: track[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [firstTime, setFirst] = useState(true);
  const [open, setOpen] = useState(false);
  const [filterOpen, setFopen] = useState(false);
  const [name, setName] = useState("Music for me");
  const [file, setFile] = useState<File>();
  const [fLink, setFlink] = useState<string | ArrayBuffer | null>();
  const [desc, setDesc] = useState("");
  const [pub, setPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    artists: Array.from(artists),
    genres: Array.from(
      new Set(
        artists
          .map((artist) => artist.genres[0])
          .filter((itm) => itm && itm.length != 0)
      )
    ),
    tracks: [],
  });

  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflowY = "hidden";
      document.body.style.marginRight = "10px";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.marginRight = "initial";
    }
  }, [filterOpen]);

  return (
    <RecommendedContext.Provider value={{ filters, recommended: items, analyses: analyses }}>
      {open && (
        <AddImage
          file={file}
          setFile={setFile}
          fLink={fLink}
          setFlink={setFlink}
          name={name}
          setName={setName}
          setOpen={setOpen}
          description={desc}
          setDescription={setDesc}
        />
      )}

      {filterOpen && (
        <motion.div
          ref={bgRef}
          onClick={(e) => {
            if (e.target == bgRef.current) {
              setFopen(false);
            }
          }}
          className="fixed grid place-items-center h-screen w-screen top-0 z-[999] bg-black/60"
        >
          <div className="bg-body-main p-4 w-2/3 h-2/3 grid grid-cols-3">
            <div className="col-span-2">
              <h6 className="font-bold uppercase text-3xl text-zinc-400">
                Current settings
              </h6>
              <form ref={formRef}>
                <DoubleSlider 
                    desc="Beats per minute (BPM) is a measure of how fast a song is, 
                    and is derived from the number of beats in a minute based off of the average beat duration."
                    min={20}
                    max={200}
                    setting="bpm"
                    label={<>Target BPM? <FaItunesNote /></>}
                    target={analyses.tempo}
                    />
                  <DoubleSlider 
                    desc="Energy is a measure of how intense a song can be, taking into consideration features such as beat strength, tempo, tension and volume"
                    min={0}
                    max={100}
                    setting="energy"
                    label={<>Target energy? <BsFillLightningChargeFill /></>}
                    target={analyses.energy}
                    />
                  <DoubleSlider 
                    desc="Loudness controls the average loudness over an entire track in decibels (dB)."
                    min={-60}
                    max={0}
                    setting="loudness"
                    label={<>Target loudness? <IoMdVolumeHigh /></>}
                    target={analyses.loudness}
                    />
                <div>
                  {/* danceability split into traits */}
                  <label
                    className="text-zinc-300 uppercase font-semibold flex items-center gap-1"
                    htmlFor="energy"
                  >
                    Target ?
                  </label>
                  <input type="range" name="" id="" />
                </div>
                <div>
                  <label
                    className="text-zinc-300 uppercase font-semibold flex items-center gap-1"
                    htmlFor="instrumental"
                  >
                    Include Instrumental Only?
                  </label>
                  <input
                    type="checkbox"
                    name="instrumental"
                    id="instrumental"
                  />
                </div>
                <input type="submit" value="" onClick={(e) => e} />
              </form>
            </div>
            <div className="p-3 pt-0">
              <div>
                <span className="filter-seeds">Current Seed Artists</span>
                <ul className="grid grid-cols-3 gap-2">
                  {filters.artists.length != 0 ? (
                    filters.artists.map((artist) => (
                      <motion.li
                        className="filter-chip group"
                        key={artist.id}
                        title={artist.name}
                      >
                        <IoMdCloseCircle
                          onClick={() =>
                            setFilters({
                              ...filters,
                              artists: filters.artists.filter(
                                (a) => a.name != artist.name
                              ),
                            })
                          }
                          className="hidden cursor-pointer group-hover:block absolute top-0 right-0 translate-x-1/2"
                        />
                        <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
                          {artist.name}
                        </span>
                      </motion.li>
                    ))
                  ) : (
                    <>
                      <div className="col-span-2 text-zinc-500">
                        Nothing to see here yet!
                      </div>
                      <motion.li className="filter-chip grid place-items-center bg-black-tertiary">
                        <FaPlus />
                      </motion.li>
                    </>
                  )}
                </ul>
              </div>
              <div className="pt-3">
                <span className="filter-seeds">Current Seed Genres</span>
                <ul className="grid grid-cols-3 gap-2">
                  {filters.genres.length != 0 ? (
                    filters.genres.map((genre) => (
                      <motion.li
                        className="filter-chip group"
                        key={genre}
                        title={genre}
                      >
                        <IoMdCloseCircle
                          onClick={() =>
                            setFilters({
                              ...filters,
                              genres: filters.genres.filter((g) => g != genre),
                            })
                          }
                          className="hidden cursor-pointer group-hover:block absolute top-0 right-0 translate-x-1/2"
                        />
                        <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
                          {genre}
                        </span>
                      </motion.li>
                    ))
                  ) : (
                    <>
                      <div className="col-span-2 text-zinc-500">
                        Nothing to see here yet!
                      </div>
                      <motion.li className="filter-chip grid place-items-center bg-black-tertiary cursor-pointer">
                        <FaPlus />
                      </motion.li>
                    </>
                  )}
                </ul>
              </div>
              <div className="pt-3">
                <span className="filter-seeds">Current Seed Tracks</span>
                <ul className="grid grid-cols-3 gap-2">
                  {filters.tracks.length != 0 ? (
                    filters.tracks.map((track) => (
                      <motion.li
                        className="filter-chip group"
                        key={track.id}
                        title={track.name}
                      >
                        <IoMdCloseCircle
                          onClick={() =>
                            setFilters({
                              ...filters,
                              tracks: filters.tracks.filter(
                                (t) => t.id != track.id
                              ),
                            })
                          }
                          className="hidden cursor-pointer group-hover:block absolute top-0 right-0 translate-x-1/2"
                        />
                        <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
                          {track.name}
                        </span>
                      </motion.li>
                    ))
                  ) : (
                    <>
                      <div className="col-span-2 text-zinc-500">
                        Nothing to see here yet!
                      </div>
                      <motion.li className="filter-chip grid place-items-center bg-black-tertiary">
                        <FaPlus />
                      </motion.li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col max-w-screen mx-auto relative px-5">
        <div
          className="text-zinc-500 font-bold uppercase flex items-center gap-1 cursor-pointer"
          onClick={() => setFopen(true)}
        >
          Filters <IoMdOptions />
        </div>

        <div className="chip-row hidden-scrollbar">
          {filters.artists.map((artist) => (
            <div
              key={artist.id}
              tabIndex={0}
              title={artist.name}
              className="chip text-card-accent border-card-base focus:bg-body-main focus:border-card-accent"
            >
              {artist.name}
            </div>
          ))}
        </div>
        <div className="chip-row hidden-scrollbar">
          {filters.genres.map((genre) => (
            <div
              key={genre}
              tabIndex={0}
              title={genre}
              className="chip text-card-accent border-card-base focus:bg-body-main focus:border-card-accent"
            >
              {genre}
            </div>
          ))}
        </div>
      </div>

      <div
        className="mx-auto shadow-lg
                      md:w-[calc(100%_-_4rem)]"
      >
        <div className="flex items-center text-2xl pr-8 gap-4 bg-body-main text-zinc-100">
          <div className="relative">
            <img
              className="object-cover aspect-square
              xs:w-36 lg:w-36"
              src={file ? (fLink as string) : items[0].album.images[0].url}
              alt="Album cover"
            />
            <div
              onClick={() => {
                setOpen(true);
              }}
              className="group absolute py-4 grid place-items-center top-0 left-0 inset-0 hover:bg-black-main/60 cursor-pointer"
            >
              <div className="group-hover:grid place-items-center hidden select-none">
                <FaPlus />
                Add Image
              </div>
            </div>
          </div>
          <div>
            <input
              type="text"
              className="text-form"
              name="Playlist name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {desc.length != 0 ? (
              <p className="max-w-xs text-base text-ellipsis overflow-hidden">
                {desc}
              </p>
            ) : null}
          </div>
          <div className="ml-auto flex flex-col items-center">
            <label
              htmlFor="public"
              className="cursor-pointer select-none relative isolate
              after:absolute after:w-[calc(100%_+_2rem)] after:h-[calc(100%_+_2rem)] after:rounded-full after:top-1/2 after:left-1/2 after:pointer-events-none
              after:-translate-y-1/2 after:-translate-x-1/2 after:-z-10 expand"
              aria-label="Toggle public on or off playlist"
            >
              {pub ? (
                <>
                  <FaLockOpen className="peer-active:translate-y-[5px] transition-transform duration-150 peer" />
                  <span className="playlist-tooltip transition-all scale-0 peer-hover:scale-100 origin-right delay-200">
                    Playlist will be <u>public</u>
                  </span>
                </>
              ) : (
                <>
                  <FaLock className="peer-active:translate-y-[5px] transition-transform duration-150 peer" />
                  <span className="playlist-tooltip transition-all scale-0 peer-hover:scale-100 origin-right delay-200">
                    Playlist will be <u>private</u>
                  </span>
                </>
              )}
            </label>
            <input
              className="hidden"
              type="checkbox"
              name="toggle-available-to-public"
              id="public"
              checked={pub}
              onChange={() => {
                setPublic(!pub);
              }}
            />
          </div>
        </div>
        <Reorder.Group
          as="ul"
          axis="y"
          onReorder={setRecommended}
          values={items}
          className="pl-0 flex flex-col"
        >
          {firstTime && (
            <div className="absolute -translate-y-3/4 left-32 text-white bg-black-main px-2 py-1 flex items-center justify-center gap-2">
              <FaArrowDown />
              <span>Grab onto me!</span>
              <IoMdClose
                className="cursor-pointer"
                onClick={() => setFirst(false)}
              />
            </div>
          )}
          {items.map((track) => (
            <PlaylistSong
              key={`${track.id}:${track.name}`}
              track={track}
              setRecommended={setRecommended}
            />
          ))}
        </Reorder.Group>
      </div>
      <button
        onClick={async () => {
          const userRes = await fetch("/api/getUser");
          const userData = await userRes.json();

          const res = await fetch(
            "/api/createPlaylist?" + new URLSearchParams({ id: userData.id }),
            {
              method: "POST",
              body: new URLSearchParams({
                name: name,
                public: `${pub}`,
                description: desc,
              }),
            }
          );
          const data = await res.json();
          const res2 = await fetch(
            "/api/addItemsToPlaylist?" +
              new URLSearchParams({
                songs: items.map((track) => track.uri).join(","),
                playlist_id: data.id,
              })
          );

          const data2 = await res2.json();
          console.log(data2);

          const res3 = await fetch(
            "/api/changePlaylistImage?" +
              new URLSearchParams({
                playlist_id: data.id,
              }),
            {
              method: "PUT",
              body: JSON.stringify((fLink as string)?.split(",")[1]),
            }
          );

          const data3 = await res3.json();

          window.open(data.external_urls.spotify);
        }}
        className={`font-semibold text-xl mx-auto block bg-card-base rounded-lg py-[.5em] px-[1.25em] hover:bg-card-base/60 mt-8 text-zinc-100 active:text-zinc-500
        ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        Create!
      </button>
    </RecommendedContext.Provider>
  );
};
export default Playlist;
