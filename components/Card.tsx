import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Menu from "./Menu";

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

interface playLartist {
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
  images: image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: {
    reason: string;
  };
  total_tracks: number;
  type: string;
  uri: string;
}

interface image {
  height: number;
  url: string;
  width: number;
}

export interface artist {
  external_urls: external_url;
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface track {
  album: album;
  artists: playLartist[];
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
  track: track;
  played_at: string;
  context: {
    external_urls: external_url;
    href: string;
    type: string;
    uri: string;
  };
}

export const getCards = () => {
  const domCards = document.querySelectorAll(".song-card");
  domCards.forEach((card) => {
    card.classList.remove("bg-g-primary");
  });
};

const Card = ({ song }: { song: playlistItem | track | artist }) => {
  if (song.track || song.type === "track") {
    return (
      <>
        <motion.div
          layout='position'
          variants={variants}
          data-open={
            song?.track?.external_urls.spotify ?? song?.external_urls.spotify
          }
          data-artists={
            song?.track?.artists
              .map(
                (artist: artist) =>
                  `${artist.name}::${artist.external_urls.spotify}`
              )
              .join(",") ??
            song?.artists
              .map(
                (artist: artist) =>
                  `${artist.name}::${artist.external_urls.spotify}`
              )
              .join(",")
          }
          className={`song-card group shadow-sm`}
        >
          <span
            data-open={
              song?.track?.external_urls.spotify ?? song?.external_urls.spotify
            }
            data-artists={
              song?.track?.artists
                .map(
                  (artist: artist) =>
                    `${artist.name}::${artist.external_urls.spotify}`
                )
                .join(",") ??
              song?.artists
                .map(
                  (artist: artist) =>
                    `${artist.name}::${artist.external_urls.spotify}`
                )
                .join(",")
            }
            className='inline-block cursor-default xs:max-w-[34ch] xsm:max-w-none md:max-w-[31ch] lg:max-w-none
                    xl:max-w-[25ch] overflow-hidden whitespace-nowrap overflow-ellipsis'
          >
            {song?.track?.name ?? song.name}
          </span>
          <span
            className=' absolute delay-300 text-white rounded-lg text-sm scale-0 group-hover:scale-100 transition-transform duration-200
            px-2 py-1 z-50 top-0 -translate-y-[117%] left-0 bg-black-main origin-bottom border-2 border-card-accent'
          >
            {song?.track?.name ?? song.name}
          </span>
          <img
            data-open={
              song?.track?.external_urls.spotify ?? song?.external_urls.spotify
            }
            data-artists={
              song?.track?.artists
                .map(
                  (artist: artist) =>
                    `${artist.name}::${artist.external_urls.spotify}`
                )
                .join(",") ??
              song?.artists
                .map(
                  (artist: artist) =>
                    `${artist.name}::${artist.external_urls.spotify}`
                )
                .join(",")
            }
            className={`aspect-square object-cover justify-self-center w-full -z-10`}
            src={song?.track?.album.images[0].url ?? song.album.images[0].url}
          />
        </motion.div>
      </>
    );
  }
  return (
    <motion.div
      layout='position'
      variants={variants}
      data-open={song?.external_urls.spotify}
      className='song-card shadow-md'
    >
      <span data-open={song?.external_urls.spotify}>{song.name}</span>
      <img
        data-open={song?.external_urls.spotify}
        className={`aspect-square object-cover justify-self-center w-full`}
        src={song.images[0].url!}
      />
    </motion.div>
  );
};
export default Card;
