import { motion } from "framer-motion";
import { playlistItem, track, artist, playLartist } from "../lib/api.d";

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

export const getCards = () => {
  const domCards = document.querySelectorAll(".song-card");
  domCards.forEach((card) => {
    card.classList.remove("bg-g-primary");
  });
};

const Card = ({ song }: { song: playlistItem | track | artist }) => {
  if ("track" in song || song.type === "track") {
    return (
      <>
        <motion.div
          layout='position'
          variants={variants}
          data-open={
            (song as playlistItem)?.track?.external_urls.spotify ??
            (song as track)?.external_urls.spotify
          }
          data-artists={
            (song as playlistItem)?.track?.artists
              .map(
                (artist: playLartist) =>
                  `${artist.name}::${artist.external_urls.spotify}`
              )
              .join(",") ??
            (song as track)?.artists
              .map(
                (artist: playLartist) =>
                  `${artist.name}::${artist.external_urls.spotify}`
              )
              .join(",")
          }
          className={`song-card group shadow-sm`}
        >
          <span
            data-open={
              (song as playlistItem)?.track?.external_urls.spotify ??
              (song as track)?.external_urls.spotify
            }
            data-artists={
              (song as playlistItem)?.track?.artists
                .map(
                  (artist: playLartist) =>
                    `${artist.name}::${artist.external_urls.spotify}`
                )
                .join(",") ??
              (song as track)?.artists
                .map(
                  (artist: playLartist) =>
                    `${artist.name}::${artist.external_urls.spotify}`
                )
                .join(",")
            }
            className='inline-block cursor-default xs:max-w-[34ch] xsm:max-w-none md:max-w-[31ch] lg:max-w-none
                    xl:max-w-[25ch] overflow-hidden whitespace-nowrap overflow-ellipsis'
          >
            {(song as playlistItem)?.track?.name ?? (song as track).name}
          </span>
          <span
            className='absolute delay-300 text-white rounded-lg text-sm scale-0 group-hover:scale-100 transition-transform duration-200
            px-2 py-1 z-50 top-0 -translate-y-[117%] left-0 bg-black-main origin-bottom border-2 border-card-accent'
          >
            {(song as playlistItem)?.track?.name ?? (song as track).name}
          </span>
          <img
            data-open={
              (song as playlistItem)?.track?.external_urls.spotify ??
              (song as track)?.external_urls.spotify
            }
            data-artists={
              (song as playlistItem)?.track?.artists
                .map(
                  (artist: playLartist) =>
                    `${artist.name}::${artist.external_urls.spotify}`
                )
                .join(",") ??
              (song as track)?.artists
                .map(
                  (artist: playLartist) =>
                    `${artist.name}::${artist.external_urls.spotify}`
                )
                .join(",")
            }
            className={`aspect-square object-cover justify-self-center w-full -z-10`}
            src={
              (song as playlistItem)?.track?.album.images[0].url ??
              (song as track).album.images[0].url
            }
          />
        </motion.div>
      </>
    );
  }
  song = song as artist;
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
        alt={song?.name + "'s cover picture"}
      />
    </motion.div>
  );
};
export default Card;
