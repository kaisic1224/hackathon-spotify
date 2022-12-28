import type { artist, track } from "../lib/api.d";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { FaLock, FaLockOpen, FaPlus } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";
import PlaylistSong from "./PlaylistSong";
import AddImage from "./AddImage";

interface Filters {
  artists: artist[];
  genres: string[];
}

const Playlist = ({
  items,
  setRecommended,
  artists,
  topTracks
}: {
  items: track[];
  setRecommended: Dispatch<SetStateAction<track[]>>;
  artists: artist[];
  topTracks: track[];
}) => {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFopen] = useState(false);
  const [name, setName] = useState("Music for me");
  const [file, setFile] = useState<File>();
  const [fLink, setFlink] = useState<string | ArrayBuffer | null>();
  const [desc, setDesc] = useState("");
  const [pub, setPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    artists,
    genres: artists.slice(0, 0).map((artist) => artist.genres[0])
  });

  useEffect(() => {
    document.body.classList.toggle("overflow-y-hidden");
  }, [filterOpen]);
  return (
    <>
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

      <AnimatePresence initial={false}>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setFopen(false);
            }}
            className='fixed w-screen inset-0 z-[9999] bg-black/60'
          >
            <motion.div
              className='bottom-0 flex flex-col text-white'
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ ease: "easeOut" }}
            >
              <div className='chip-row hidden-scrollbar'>
                {filters.artists.map((artist) => (
                  <div
                    key={artist.id}
                    tabIndex={0}
                    className='chip text-card-accent border-card-base focus:bg-body-main'
                  >
                    {artist.name}
                  </div>
                ))}
              </div>
              <label htmlFor='acousticness'>Include acousticness?</label>
              <input type='checkbox' name='acousticness' id='acousticness' />
              <label htmlFor='danceability'>Include danceability?</label>
              <input type='checkbox' name='danceability' id='danceability' />
              <label htmlFor='instrumentalness'>
                Include instrumentalness?
              </label>
              <input
                type='checkbox'
                name='instrumentalness'
                id='instrumentalness'
              />
              <label htmlFor='liveness'>Include liveness?</label>
              <input type='checkbox' name='liveness' id='liveness' />
              <label htmlFor='loudness'>Include loudness?</label>
              <input type='checkbox' name='loudness' id='loudness' />
              <label htmlFor='popularity'>Include popularity?</label>
              <input type='checkbox' name='popularity' id='popularity' />
              <label htmlFor='speechiness'>Include speechiness?</label>
              <input type='checkbox' name='speechiness' id='speechiness' />
              <label htmlFor='tempo'>Include tempo?</label>
              <input type='checkbox' name='tempo' id='tempo' />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='flex flex-col max-w-screen mx-auto relative px-5'>
        <div
          className='text-zinc-500 font-bold uppercase flex items-center gap-1'
          onClick={() => setFopen((v) => !v)}
        >
          Filters <IoMdOptions />
        </div>

        <div className='chip-row hidden-scrollbar'>
          {filters.genres.map((genre) => (
            <div
              key={genre}
              tabIndex={0}
              className='chip text-card-accent border-card-base focus:bg-body-main'
            >
              {genre}
            </div>
          ))}
        </div>
      </div>

      <div className='mx-auto shadow-lg'>
        <div className='flex items-center text-2xl pr-8 gap-4 bg-body-main text-zinc-100'>
          <div className='relative'>
            <img
              className='object-cover aspect-square
              xs:w-36 lg:w-36'
              src={file ? (fLink as string) : items[0].album.images[0].url}
              alt='Album cover'
            />
            <div
              onClick={() => {
                setOpen(true);
              }}
              className='group absolute py-4 grid place-items-center top-0 left-0 inset-0 hover:bg-black-main/60 cursor-pointer'
            >
              <div className='group-hover:grid place-items-center hidden select-none'>
                <FaPlus />
                <span className='xs:hidden sm:inline'>Add image</span>
              </div>
            </div>
          </div>
          <div>
            <input
              type='text'
              className='text-form'
              name='Playlist name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {desc.length != 0 ? (
              <p className='max-w-xs text-base text-ellipsis overflow-hidden'>
                {desc}
              </p>
            ) : null}
          </div>
          <div className='ml-auto flex flex-col items-center'>
            <label
              htmlFor='public'
              className='cursor-pointer select-none relative isolate
              after:absolute after:w-[calc(100%_+_2rem)] after:h-[calc(100%_+_2rem)] after:rounded-full after:top-1/2 after:left-1/2 after:pointer-events-none
              after:-translate-y-1/2 after:-translate-x-1/2 after:-z-10 expand'
              aria-label='Toggle public on or off playlist'
            >
              {pub ? (
                <>
                  <FaLockOpen className='peer-active:translate-y-[5px] transition-transform duration-150 peer' />
                  <span className='playlist-tooltip transition-all scale-0 peer-hover:scale-100 origin-right delay-200 xs:hidden md:inline'>
                    Playlist will be <b>public</b>
                  </span>
                </>
              ) : (
                <>
                  <FaLock className='peer-active:translate-y-[5px] transition-transform duration-150 peer' />
                  <span className='playlist-tooltip transition-all scale-0 peer-hover:scale-100 origin-right delay-200 xs:hidden md:inline'>
                    Playlist will be <b>private</b>
                  </span>
                </>
              )}
            </label>
            <input
              className='hidden'
              type='checkbox'
              name='toggle-available-to-public'
              id='public'
              checked={pub}
              onChange={() => {
                setPublic(!pub);
              }}
            />
          </div>
        </div>
        <Reorder.Group
          as='ul'
          axis='y'
          onReorder={setRecommended}
          values={items}
          className='pl-0 flex flex-col'
        >
          {items.map((track) => (
            <PlaylistSong key={`${track.id}:${track.name}`} track={track} />
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
                description: desc
              })
            }
          );
          const data = await res.json();
          const res2 = await fetch(
            "/api/addItemsToPlaylist?" +
              new URLSearchParams({
                songs: items.map((track) => track.uri).join(","),
                playlist_id: data.id
              })
          );

          const data2 = await res2.json();
          console.log(data2);

          const res3 = await fetch(
            "/api/changePlaylistImage?" +
              new URLSearchParams({
                playlist_id: data.id
              }),
            {
              method: "PUT",
              body: JSON.stringify((fLink as string)?.split(",")[1])
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
    </>
  );
};
export default Playlist;
