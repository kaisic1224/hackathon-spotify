import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from "react";
import { FaSearch } from "react-icons/fa";
import { track } from "../lib/api";

function debounce(f: Function, t: number) {
  let timer: any;
  return (...params: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      f(...params);
    }, t);
  };
}

const Searchbar = ({
  items,
  setRecommended
}: {
  items: track[];
  setRecommended: Dispatch<SetStateAction<track[]>>;
}) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<track>();

  const searchHandler = async (query: string) => {
    if (query.length === 0) return;
    const q = new URLSearchParams({ q: query });
    const response = await fetch("/api/search?" + q.toString());

    const data = await response.json();

    setResults(data.tracks.items[0]);
  };

  const debouncedDay = useCallback(
    debounce((s: string) => {
      searchHandler(s);
    }, 750),
    []
  );

  useEffect(() => {
    if (search.length === 0) setResults(undefined);
    debouncedDay(search.trim());
  }, [search]);

  return (
    <div
      className='relative max-w-[calc(100%_-_3rem)] lg:max-w-lg xl:max-w-3xl mx-auto my-3
      after:absolute after:-inset-2 after:border after:border-card-accent/60 after:rounded-md after:pointer-events-none focus:after:border-zinc-600'
    >
      <input
        className='search peer'
        type='text'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FaSearch className='absolute top-1/2 left-2 -translate-y-1/2 w-5 h-5 fill-zinc-700' />
      {results && (
        <div
          className='absolute w-full bg-black-main/60 backdrop-blur-sm items-center p-2 z-[9999] flex'
          onClick={() => {
            setRecommended([...items, results]);
            setResults(undefined);
          }}
        >
          <img
            src={results.album.images[results.album.images.length - 1].url}
          />
          <div className='flex flex-col ml-2 font-bold'>
            <span className='text-sm text-zinc-400'>{results?.name}</span>
            <span className='text-xs text-zinc-500'>
              {results?.artists.map((artist) => artist.name).join(" • ")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Searchbar;
