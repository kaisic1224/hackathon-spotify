import Image from "next/image";
import { motion } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
    y: "80%"
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut"
    }
  }
};

export interface card {
  title: string;
  image: string;
}

interface artist {
  external_urls: external_url;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface external_url {
  spotify: string;
}

interface album {
  album_type: string;
  artists: artist[];
  available_markets: string[];
  external_urls: external_url;
  href: string;
  id: string;
  images: [
    {
      height: number;
      url: string;
      width: number;
    }
  ];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface image {
  height: number;
  url: string;
  width: number;
}

export interface track {
  album: album;
  artists: artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: external_url;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface playlistItem {
  track?: track;
  played_at: string;
  context: {
    external_urls: external_url;
    href: string;
    type: string;
    uri: string;
  };
}

const Card = ({ song }: { song: playlistItem | track }) => {
  if (song.track || song.type === "track") {
    return (
      <motion.div
        layout
        variants={variants}
        className='bg-body-main hover:bg-g-primary min-w-[300px] min-h-[300px] text-white font-medium
         p-4 rounded-xl md:w-full'
      >
        {song.track?.name ?? song.name}
        <img
          className='mt-1 aspect-square object-cover'
          src={song.track?.album.images[1].url ?? song.album.images[1].url}
          width={
            song.track?.album.images[1].width ?? song.album.images[1].width
          }
          height={
            song.track?.album.images[1].height ?? song.album.images[1].height
          }
        />
      </motion.div>
    );
  }
  return (
    <motion.div
      layout
      variants={variants}
      className='bg-body-main hover:bg-g-primary min-w-[300px] min-h-[300px] text-white font-medium
      p-4 rounded-xl md:w-full'
    >
      {song.name}
      <img
        className='mt-1 aspect-square object-cover'
        src={song.images[1].url!}
        width={song.images[1].width}
        height={song.images[1].height}
      />
    </motion.div>
  );
};
export default Card;
