import {
  DragControls,
  Reorder,
  useDragControls,
  useMotionValue
} from "framer-motion";
import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { track } from "./Card";

const PlaylistSong = ({ track }: { track: track }) => {
  const [open, setOpen] = useState(false);
  const y = useMotionValue(0);
  return (
    <Reorder.Item
      value={track}
      className='grid grid-cols-5 justify-items-start items-center pr-4 hover:bg-card-base select-none'
    >
      <img
        className='object-cover aspect-square w-20 select-none'
        src={track.album.images[2].url}
        alt='Track art cover'
      />
      <span className='crossover'>{track.name}</span>
      <span className=''>
        {track.artists.map((artist) => (
          <a
            key={artist.id}
            target={"_blank"}
            href={artist.external_urls.spotify}
            className='text-white no-underline hover:underline'
          >
            {artist.name}
          </a>
        ))}
      </span>
      <div className='relative justify-self-end'>
        <FaEllipsisH
          onClick={() => setOpen(!open)}
          className='rounded-full w-6 h-6 p-1 cursor-pointer hover:bg-card-accent'
        />
        {open && (
          <div className='absolute p-1 bg-body-main rounded-md -left-1 -top-1 -translate-x-full'>
            <div
              className='whitespace-nowrap hover:bg-card-accent cursor-pointer'
              onClick={() => window.open(track.external_urls.spotify)}
            >
              Open in Spotify
            </div>
          </div>
        )}
      </div>
    </Reorder.Item>
  );
};
export default PlaylistSong;
