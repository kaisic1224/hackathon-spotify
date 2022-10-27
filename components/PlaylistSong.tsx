import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { track } from "../lib/api.d";

const PlaylistSong = ({ track }: { track: track }) => {
  const [open, setOpen] = useState(false);
  return (
    <Reorder.Item
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
        <span className='crossover text-zinc-50 font-semibold'>
          {track.name}
        </span>
        <span className='text-zinc-500'>
          {track.artists
            .slice(0, 3)
            .map((artist) => artist.name)
            .join(" • ")}
        </span>
      </div>
    </Reorder.Item>
  );
};
export default PlaylistSong;
