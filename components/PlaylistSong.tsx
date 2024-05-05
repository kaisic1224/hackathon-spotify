import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { track } from "../lib/api.d";

const PlaylistSong = ({ track }: { track: track }) => {
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
      className='flex items-center pr-4 bg-body-main/40 hover:bg-card-base select-none'
    >
      <img
        className='object-cover aspect-square w-20 select-none'
        src={track.album.images[2].url}
        alt='Track art cover'
      />
      <div className='flex flex-col self-start ml-2 mt-2'>
        <span
          onPointerDown={(e) => controls.start(e)}
          className='crossover text-zinc-50 font-semibold cursor-grab active:cursor-grabbing'
        >
          {track.name}
        </span>
        <span className='text-zinc-500'>
          {track.artists.map((artist, i) => (
            <>
              <a
                key={`${track.name}:${artist.name}`}
                className='text-zinc-500 no-underline hover:underline hover:text-zinc-300'
                href={artist.external_urls.spotify}
              >
                {artist.name}
              </a>
              <>{i != track.artists.length - 1 && " • "}</>
            </>
          ))}
        </span>
      </div>
    </Reorder.Item>
  );
};
export default PlaylistSong;
