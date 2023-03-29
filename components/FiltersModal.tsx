import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef
} from "react";
import { motion } from "framer-motion";
import { Filters } from "./Playlist";
import Searchbar from "./Searchbar";
import { songEnergies } from "../lib/songInfo";
import MinMaxSlider from "./MinMaxSlider";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { artist, track } from "../lib/api";

const FiltersModal = ({
  setFopen,
  filters,
  setFilters,
  topArtists
}: {
  setFopen: Dispatch<SetStateAction<boolean>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  topArtists: artist[];
}) => {
  const [key, setKey] = useState("");
  const [minAcousticness, setMinAcousticness] = useState(0);
  const [maxAcousticness, setMaxAcousticness] = useState(100);
  const [minDanceability, setMinDanceability] = useState(0);
  const [maxDanceability, setMaxDanceability] = useState(100);
  const [minInstrumentalness, setMinInstrumentalness] = useState(0);
  const [maxInstrumentalness, setMaxInstrumentalness] = useState(100);
  const [minLoudness, setMinLoudness] = useState(-60);
  const [maxLoudness, setMaxLoudness] = useState(0);
  const [minPopularity, setMinPopularity] = useState(0);
  const [maxPopularity, setMaxPopularity] = useState(100);
  const [minSpeechiness, setMinSpeechiness] = useState(0);
  const [maxSpeechiness, setMaxSpeechiness] = useState(100);
  const [minTempo, setMinTempo] = useState(60);
  const [maxTempo, setMaxTempo] = useState(260);
  const live = useRef<HTMLInputElement>(null);
  const [songs, setSongs] = useState<track[]>([]);

  const generateSongs = async () => {
    if (key !== "0" && key !== "1") {
      return alert("rad");
    }
    const q = new URLSearchParams({
      minAcousticness: (minAcousticness / 100).toString(),
      maxAcousticness: (maxAcousticness / 100).toString(),
      minDanceability: (minDanceability / 100).toString(),
      maxDanceability: (maxDanceability / 100).toString(),
      minInstrumentalness: (minInstrumentalness / 100).toString(),
      maxInstrumentalness: (maxInstrumentalness / 100).toString(),
      minLoudness: minLoudness.toString(),
      maxLoudness: maxLoudness.toString(),
      minPopularity: minPopularity.toString(),
      maxPopularity: maxPopularity.toString(),
      minSpeechiness: (minSpeechiness / 100).toString(),
      maxSpeechiness: (maxSpeechiness / 100).toString(),
      minTempo: minTempo.toString(),
      maxTempo: maxTempo.toString(),
      seed_artists: filters.artists
        .slice(0, 2)
        .map((artist) => artist.id)
        .join(","),
      target_mode: key,
      target_liveness: live.current?.checked ? "1" : "0"
    });
    const r = await fetch(`/api/getRecommend?${q.toString()}`);

    const data = await r.json();
    console.log(data);

    setSongs(data.tracks);
  };

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
          <Searchbar
            filters={true}
            items={filters}
            setRecommended={setFilters}
          />
        </div>
        <div className='chip-row hidden-scrollbar'>
          {topArtists.map((artist) => (
            <div
              key={artist.id}
              tabIndex={0}
              style={{
                backgroundImage: `url(${
                  artist.images[artist.images.length - 1].url
                })`
              }}
              aria-label={`${artist.name}'s profile picture`}
              className='chip radial text-white border-card-base relative isolate'
              onClick={() =>
                setFilters({
                  ...filters,
                  artists: filters.artists.filter((a) => artist.id != a.id)
                })
              }
            >
              <span className='z-10'>{artist.name}</span>
            </div>
          ))}
        </div>
        <div className='chip-row hidden-scrollbar'>
          {filters.genres.map((genre) => (
            <div
              key={genre}
              tabIndex={0}
              style={{ backgroundImage: `url(/${genre}.jpg)` }}
              className='chip radial text-white border-card-base relative isolate'
              onClick={() =>
                setFilters({
                  ...filters,
                  genres: filters.genres.filter((g) => genre != g)
                })
              }
            >
              {genre}
            </div>
          ))}
        </div>
        <div className='flex'>
          <div className='flex-1'>
            <div className='grid grid-cols-4 gap-4'>
              {songs.map((song) => (
                <div
                  className='grid place-items-center p-8 isolate rounded-lg relative radial'
                  key={song.id}
                  style={{
                    backgroundImage: `url(${song.album.images[0].url})`
                  }}
                  aria-label={`${song.album.name} by ${song.album.artists
                    .map((artist) => artist.name)
                    .join(", ")}'s album cover`}
                >
                  <span className='font-bold text-3xl text-center'>
                    {song.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='w-[26rem]'>
            <label
              className='uppercase tracking-widest text-sm relative flex items-center gap-[1ch]'
              htmlFor='max-acousticness'
            >
              Acousticness <AiOutlineQuestionCircle className='peer' />
              <span className='chip-tooltip'>
                A rating of 100 highly represents the chance that the song is
                acoustic
              </span>
            </label>
            <MinMaxSlider
              setMax={setMaxAcousticness}
              setMin={setMinAcousticness}
              min={minAcousticness}
              max={maxAcousticness}
              label='acousticness'
              bounds={[0, 100]}
            />

            <label
              className='uppercase tracking-widest text-sm relative flex items-center gap-[1ch] group'
              htmlFor='danceability'
            >
              Danceability <AiOutlineQuestionCircle className='peer' />
              <span className='chip-tooltip'>
                A rating of 100 highly represents the danceable energy of the
                song
              </span>
            </label>
            <MinMaxSlider
              setMax={setMaxDanceability}
              setMin={setMinDanceability}
              min={minDanceability}
              max={maxDanceability}
              label='danceability'
              bounds={[0, 100]}
            />

            <label
              className='uppercase tracking-widest text-sm relative flex gap-[1ch] items-center'
              htmlFor='instrumentalness'
            >
              Instrumentalness <AiOutlineQuestionCircle className='peer' />
              <span className='chip-tooltip'>
                A rating of 100 highly represents the chance the song contains
                many lyrics
              </span>
            </label>
            <MinMaxSlider
              setMax={setMinInstrumentalness}
              setMin={setMaxInstrumentalness}
              min={minInstrumentalness}
              max={maxInstrumentalness}
              label='instrumentalness'
              bounds={[0, 100]}
            />

            <label
              className='uppercase tracking-widest text-sm relative flex items-center gap-[1ch]'
              htmlFor='loudness'
            >
              Loudness
            </label>
            <MinMaxSlider
              setMax={setMaxLoudness}
              setMin={setMinLoudness}
              min={minLoudness}
              max={maxLoudness}
              label='loudness'
              bounds={[-60, 0]}
            />

            <label
              className='uppercase tracking-widest text-sm relative flex items-center gap-[1ch]'
              htmlFor='popularity'
            >
              Popularity
            </label>
            <MinMaxSlider
              setMax={setMaxPopularity}
              setMin={setMinPopularity}
              min={minPopularity}
              max={maxPopularity}
              label='popularity'
              bounds={[0, 100]}
            />
            <label
              className='uppercase tracking-widest text-sm relative flex items-center gap-[1ch]'
              htmlFor='speechiness'
            >
              Speechiness <AiOutlineQuestionCircle className='peer' />
              <span className='chip-tooltip'>
                33 filters out non verbal songs, whereas above 66 is nearly
                entirely words
              </span>
            </label>
            <MinMaxSlider
              setMax={setMaxSpeechiness}
              setMin={setMinSpeechiness}
              min={minSpeechiness}
              max={maxSpeechiness}
              label='speechiness'
              bounds={[0, 100]}
            />
            <label
              className='uppercase tracking-widest text-sm'
              htmlFor='tempo'
            >
              Tempo
            </label>
            <MinMaxSlider
              setMax={setMaxTempo}
              setMin={setMinTempo}
              min={minTempo}
              max={maxTempo}
              label='tempo'
              bounds={[60, 260]}
            />
            <div>
              <label
                className='uppercase tracking-widest text-sm'
                htmlFor='key'
              >
                Key
              </label>
              <div className='flex gap-2'>
                <label htmlFor='major'>
                  <input
                    type='radio'
                    name='key'
                    id='major'
                    value='1'
                    checked={key === "1"}
                    onChange={(e) => setKey(e.target.value)}
                  />
                  Major
                </label>
                <label htmlFor='minor'>
                  <input
                    type='radio'
                    name='key'
                    id='minor'
                    value='0'
                    checked={key === "0"}
                    onChange={(e) => setKey(e.target.value)}
                  />
                  Minor
                </label>
                <div className='uppercase' onClick={() => setKey("")}>
                  clear
                </div>
              </div>
            </div>
            <div>
              <label
                className='uppercase tracking-widest text-sm'
                htmlFor='liveness'
              >
                Live audience
              </label>
              <input ref={live} type='checkbox' name='liveness' id='liveness' />
              <div onClick={generateSongs}>SUBMIT SONGS</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FiltersModal;
