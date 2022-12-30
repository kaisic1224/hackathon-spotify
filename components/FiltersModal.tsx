import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  useEffect
} from "react";
import { motion } from "framer-motion";
import { Filters } from "./Playlist";
import Searchbar from "./Searchbar";
import { songEnergies } from "../lib/songInfo";
import MinMaxSlider from "./MinMaxSlider";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const FiltersModal = ({
  setFopen,
  filters,
  setFilters
}: {
  setFopen: Dispatch<SetStateAction<boolean>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}) => {
  const [key, setKey] = useState("");

  return (
    <div
      onDoubleClick={() => {
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
        <div className='py-5 flex justify-center'>
          <Searchbar items={filters} setRecommended={setFilters} />
        </div>
        <div className='chip-row hidden-scrollbar'>
          {filters.artists.map((artist) => (
            <div
              key={artist.id}
              tabIndex={0}
              style={{ backgroundImage: `url(${artist.images[2].url})` }}
              aria-label={`${artist.name}'s profile picture`}
              className='chip radial text-white border-card-base relative isolate'
            >
              <span className='z-10'>{artist.name}</span>
            </div>
          ))}
        </div>
        <div className='chip-row hidden-scrollbar'>
          {Array.from(songEnergies.keys()).map((genre) => (
            <div
              key={genre}
              tabIndex={0}
              style={{ backgroundImage: `url(/${genre}.jpg)` }}
              className='chip radial text-white border-card-base relative isolate'
            >
              {genre}
            </div>
          ))}
        </div>
        <div className='w-[26rem] ml-auto'>
          <label
            className='uppercase tracking-widest text-sm relative flex items-center gap-[1ch]'
            htmlFor='max-acousticness'
          >
            Acousticness <AiOutlineQuestionCircle className='peer' />
            <span className='absolute left-0 whitespace-nowrap -translate-x-[calc(100%_+_2ch)] top-1/2 -translate-y-1/2 scale-0 peer-hover:scale-100 normal-case'>
              A rating of 100 highly represents the chance that the song is
              acoustic
            </span>
          </label>
          <MinMaxSlider label='acousticness' bounds={[0, 100]} />

          <label
            className='uppercase tracking-widest text-sm relative flex items-center gap-[1ch] group'
            htmlFor='danceability'
          >
            Danceability <AiOutlineQuestionCircle className='peer' />
            <span className='absolute left-0 whitespace-nowrap -translate-x-[calc(100%_+_2ch)] top-1/2 -translate-y-1/2 scale-0 peer-hover:scale-100 normal-case'>
              A rating of 100 highly represents the danceable energy of the song
            </span>
          </label>
          <MinMaxSlider label='danceability' bounds={[0, 100]} />

          <label
            className='uppercase tracking-widest text-sm relative flex gap-[1ch] items-center'
            htmlFor='instrumentalness'
          >
            Instrumentalness <AiOutlineQuestionCircle className='peer' />
            <span className='absolute left-0 whitespace-nowrap -translate-x-[calc(100%_+_2ch)] top-1/2 -translate-y-1/2 scale-0 peer-hover:scale-100 normal-case'>
              A rating of 100 highly represents the chance the song contains
              many lyrics
            </span>
          </label>
          <MinMaxSlider label='instrumentalness' bounds={[0, 100]} />

          <label
            className='uppercase tracking-widest text-sm relative flex items-center gap-[1ch]'
            htmlFor='loudness'
          >
            Loudness <AiOutlineQuestionCircle className='peer' />
          </label>
          <MinMaxSlider label='loudness' bounds={[-60, 0]} />

          <label
            className='uppercase tracking-widest text-sm relative flex items-center gap-[1ch]'
            htmlFor='popularity'
          >
            Popularity <AiOutlineQuestionCircle className='peer' />
          </label>
          <MinMaxSlider label='popularity' bounds={[0, 100]} />
          <label
            className='uppercase tracking-widest text-sm relative flex items-center gap-[1ch]'
            htmlFor='speechiness'
          >
            Speechiness <AiOutlineQuestionCircle className='peer' />
            <span className='absolute left-0 whitespace-nowrap bg-black-main tracking-tighter lg:-translate-x-[calc(100%_+_2ch)] top-1/2 -translate-y-1/2 scale-0 peer-hover:scale-100 lowercase'>
              0.33 filters out non verbal songs, whereas above 0.66 is nearly
              entirely words
            </span>
          </label>
          <MinMaxSlider label='speechiness' bounds={[0, 100]} />
          <label className='uppercase tracking-widest text-sm' htmlFor='tempo'>
            Tempo
          </label>
          <MinMaxSlider label='tempo' bounds={[60, 260]} />
          <div onChange={(e) => setKey((e.target as HTMLInputElement).value)}>
            <label className='uppercase tracking-widest text-sm' htmlFor='key'>
              Key
            </label>
            <div className='flex gap-2'>
              <label htmlFor='major'>
                <input type='radio' name='key' id='major' value={1} /> Major
              </label>
              <label htmlFor='minor'>
                <input type='radio' name='key' id='minor' value={0} /> Minor
              </label>
            </div>
          </div>
          <div>
            <label
              className='uppercase tracking-widest text-sm'
              htmlFor='liveness'
            >
              Live audience
            </label>
            <input type='checkbox' name='liveness' id='liveness' />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FiltersModal;
