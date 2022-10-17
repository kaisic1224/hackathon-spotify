import type { track } from "./Card";
import { Reorder } from "framer-motion";
import React, { useState } from "react";
import { FaLock, FaLockOpen, FaPlus } from "react-icons/fa";
import PlaylistSong from "./PlaylistSong";
import AddImage from "./AddImage";

const Playlist = ({ items }: { items: track[] }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Music for me");
  const [file, setFile] = useState<File>();
  const [fLink, setFlink] = useState<string | ArrayBuffer | null>();
  const [desc, setDesc] = useState("");
  const [tracks, setTracks] = useState(items);
  const [pub, setPublic] = useState(false);
  const [loading, setLoading] = useState(false);

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
      <div className='shadow-lg'>
        <div className='flex items-center text-2xl pr-8 gap-4 bg-body-main'>
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
          style={{ height: 320, overflowY: "auto" }}
          className='flex flex-col pr-7 pl-0'
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
