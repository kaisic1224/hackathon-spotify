import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { track } from "../lib/api.d";
import { RecommendedContext } from "./Playlist";

const PlaylistSong = ({ track, setRecommended }: { track: track; setRecommended: Dispatch<SetStateAction<track[]>> }) => {
  const recommended = useContext(RecommendedContext)
  const [open, setOpen] = useState(false);
  const controls = useDragControls();
  return (
    <Reorder.Item
      dragConstraints={{ bottom: 0, top: 0 }}
      dragControls={controls}
      dragListener={false}
      dragElastic={1}
      value={track}
      id={track.id}
      key={`${track.id}:${track.name}`}
      onContextMenu={() => setOpen(true)}
      className='flex items-center pr-4 bg-body-main/40 hover:bg-card-base select-none'
    >
      {open && (
        <div className="absolute">
          <span>add</span>
          <span onClick={() => setRecommended(recommended!.recommended!.filter((t) => t.id != track.id))}>remove</span>
        </div>
      )}
      <img
        className='object-cover aspect-square w-20 select-none'
        src={track.album.images[2].url}
        alt='Track art cover'
      />
      <div className='flex flex-col self-start ml-2 mt-2'>
        <span
          onPointerDown={(e) => controls.start(e)}
          className='crossover text-zinc-50 font-semibold cursor-grab active:cursor-grabbing active:text-zinc-400'
        >
          {track.name}
        </span>
        <span className='text-zinc-500'>
          {track.artists.map((artist, i) => (
            <React.Fragment key={`${track.name}:${artist.name}:${i}`}>
              <a
                className='text-zinc-500 no-underline hover:underline hover:text-zinc-300'
                href={artist.external_urls.spotify}
              >
                {artist.name}
              </a>
              <>{i != track.artists.length - 1 && " • "}</>
            </React.Fragment>
          ))}
        </span>
      </div>
    </Reorder.Item>
  );
};
export default PlaylistSong;
