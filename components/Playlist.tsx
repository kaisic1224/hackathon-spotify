import type { artist, track } from "../lib/api.d";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { FaLock, FaLockOpen, FaPlus } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";
import PlaylistSong from "./PlaylistSong";
import AddImage from "./AddImage";

interface Filters {
  artists: artist[];
  tracks: track[];
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
  const [filterOpen, setFopen] = useState(true);
  const [name, setName] = useState("Music for me");
  const [file, setFile] = useState<File>();
  const [fLink, setFlink] = useState<string | ArrayBuffer | null>();
  const [desc, setDesc] = useState("");
  const [tracks, setTracks] = useState(items);
  const [pub, setPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    artists,
    tracks: topTracks
  });

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

      {filterOpen && <motion.div className='absolute w-screen'></motion.div>}

      <div className='flex flex-col max-w-screen relative'>
        <div className='text-zinc-500 font-bold uppercase flex items-center gap-1'>
          Filters <IoMdOptions />
        </div>
        <div className='overflow-x-auto flex gap-2 hidden-scrollbar items-center pb-3 pt-1'>
          {filters.artists.map((artist) => (
            <div
              tabIndex={0}
              className='whitespace-nowrap chip text-card-accent border-card-base focus:bg-body-main focus:border-card-accent'
            >
              {artist.name}
            </div>
          ))}
        </div>
      </div>

      <div className='shadow-lg'>
        <div className='flex items-center text-2xl pr-8 gap-4 bg-body-main text-zinc-100'>
          <div className='relative'>
            <img
              className='object-cover aspect-square w-36 peer'
              src={file ? (fLink as string) : tracks[0].album.images[0].url}
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
                Add Image
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
            <label htmlFor='public' className='cursor-pointer select-none'>
              {pub ? (
                <div className='flex items-center gap-2'>
                  <span className='peer'>Public</span>
                  <FaLockOpen className='peer-active:translate-y-[5px] transition-transform duration-150' />
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <span className='peer'>Private</span>
                  <FaLock className='peer-active:translate-y-[5px] transition-transform duration-150' />
                </div>
              )}
            </label>
          </div>
        </div>
        <Reorder.Group
          axis='y'
          onReorder={setTracks}
          values={tracks}
          className='pl-0 playlist'
        >
          {tracks.map((track) => (
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
                songs: tracks.map((track) => track.uri).join(","),
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
        className={`font-semibold text-xl mx-auto block bg-card-base rounded-lg py-[.5em] px-[1.25em] hover:bg-card-accent
        ${loading ? "cursor-not-allowed" : "cursor-auto"}`}
      >
        Create!
      </button>
    </>
  );
};
export default Playlist;
