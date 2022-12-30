import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCircle, FaSearch } from "react-icons/fa";
import { track } from "../lib/api";
import Toast from "./Toast";
import { Filters } from "./Playlist";

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
  items: track[] | Filters;
  setRecommended:
    | Dispatch<SetStateAction<track[]>>
    | Dispatch<SetStateAction<Filters>>;
}) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<track[]>();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const searchHandler = async (query: string) => {
    if (query.length === 0) return;
    setLoading(true);
    const q = new URLSearchParams({ q: query });
    const response = await fetch("/api/search?" + q.toString());

    const data = await response.json();

    setResults(data.tracks.items);
    setLoading(false);
  };

  const debouncedSearch = useCallback(
    debounce((s: string) => {
      searchHandler(s);
    }, 750),
    []
  );

  useEffect(() => {
    if (search.length === 0) {
      setResults(undefined);
      setLoading(false);
    }
    debouncedSearch(search.trim());
  }, [search]);

  return (
    <>
      <AnimatePresence initial={false}>
        {toast && <Toast>Saved to playlist</Toast>}
      </AnimatePresence>

      <div
        className='relative w-screen max-w-[calc(100%_-_3rem)] md:max-w-2xl xl:max-w-3xl my-3
        after:absolute after:-inset-2 after:border after:border-card-accent/60 after:rounded-md after:pointer-events-none focus:after:border-zinc-600'
      >
        <input
          className='search peer'
          type='text'
          placeholder='Search'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onFocus={() => {
            resultsRef.current?.classList.toggle("hidden");
          }}
        />
        <FaSearch className='absolute top-1/2 left-2 -translate-y-1/2 w-5 h-5 fill-zinc-700' />
        {results ? (
          <div
            ref={resultsRef}
            className='absolute w-full flex flex-col z-[999] rounded-b-md overflow-hidden'
          >
            {results.map((result) => (
              <div
                key={result.id}
                className='bg-black-main/60 backdrop-blur-sm items-center p-2 flex cursor-pointer hover:bg-black-secondary/80'
                onClick={() => {
                  setRecommended([...items, result]);
                  setToast(true);
                  resultsRef.current?.classList.toggle("hidden");

                  setTimeout(() => {
                    setToast(false);
                  }, 2000);
                }}
              >
                <img
                  src={result.album.images[result.album.images.length - 1].url}
                  alt={`Album cover for ${result.album.name}`}
                />
                <div className='flex flex-col ml-2 font-bold'>
                  <span className='text-sm text-zinc-400'>{result?.name}</span>
                  <span className='text-xs text-zinc-500'>
                    {result?.artists.map((artist) => artist.name).join(" • ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>{loading && <LoadingResults />}</>
        )}
      </div>
    </>
  );
};
export default Searchbar;

const vars = {
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
const ballVars = {
  hidden: {
    x: "-200%",
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      repeat: Infinity
    }
  }
};

const LoadingResults = () => {
  return (
    <motion.div
      variants={vars}
      initial='hidden'
      animate='show'
      className='flex w-full items-center justify-center gap-2 absolute bg-black-main h-8 z-[998]'
    >
      <motion.div variants={ballVars} className='text-black-secondary'>
        <FaCircle />
      </motion.div>
      <motion.div variants={ballVars} className='text-black-secondary'>
        <FaCircle />
      </motion.div>
      <motion.div variants={ballVars} className='text-black-secondary'>
        <FaCircle />
      </motion.div>
    </motion.div>
  );
};
