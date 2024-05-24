import { IoMdCloseCircle } from "react-icons/io";
import { genreSeeds } from "../lib/genres";
import { FaPlus } from "react-icons/fa";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Filters, RecommendedContext } from "./Playlist";
import { debounce } from "./DatePicker";
import { artist, track } from "../lib/api";
import Image from "next/image";

const FilterSearch = ({
  topic,
  setFilters,
}: {
  topic: "artists" | "genres" | "tracks";
  setFilters: Dispatch<SetStateAction<Filters>>;
}) => {
  const [search, setSearch] = useState("");
  const [listItems, setListItems] = useState<string[] | artist[] | track[]>([]);
  const [open, setOpen] = useState(false);

  const searchHandler = async (query: string) => {
    if (query.length === 0) return;
    if (topic === "genres") {
      setListItems(genreSeeds.filter((seed) => seed === query))
      return;
    }
    const q = new URLSearchParams({
      q: query,
      type: topic.slice(0, topic.length - 1),
      limit: "3"
    });
    const response = await fetch("/api/search?" + q.toString());

    const data = await response.json();
    setListItems(data[topic].items);
  };

  const debouncedDay = useCallback(
    debounce((s: string) => {
      searchHandler(s);
    }, 750),
    []
  );

  useEffect(() => {
    debouncedDay(search.trim());
  }, [search]);

  const ctx = useContext(RecommendedContext);
  let filters = ctx?.filters!;

  return (
    <div className="pt-3">
      <span className="filter-seeds">Current seed {topic}</span>
      <ul className="grid grid-cols-3 gap-2 relative">
        {topic === "genres"
          ? filters[topic].map((itm) => {
              itm = itm as string;
              return (
                <li className="filter-chip group" key={itm} title={itm}>
                  <IoMdCloseCircle
                    onClick={() =>
                      setFilters({
                        ...filters,
                        genres: filters.genres.filter((g) => g != itm),
                      })
                    }
                    className="hidden cursor-pointer group-hover:block absolute top-0 right-0 translate-x-1/2"
                  />
                  <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
                    {itm}
                  </span>
                </li>
              );
            })
          : filters[topic].map((itm) => {
              return (
                <li className="filter-chip group" key={itm.id} title={itm.name}>
                  <IoMdCloseCircle
                    onClick={() =>
                      setFilters({
                        ...filters,
                        [topic]: filters[topic].filter((g) => g.id != itm.id),
                      })
                    }
                    className="hidden cursor-pointer group-hover:block absolute top-0 right-0 translate-x-1/2"
                  />
                  <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
                    {itm.name}
                  </span>
                </li>
              );
            })}
      </ul>
      <div className="relative">

      <li onClick={() => setOpen(!open)} className="mt-4 filter-chip grid place-items-center bg-black-tertiary cursor-pointer">
        <FaPlus />
      </li>
      {open && (
      <div className="h-32 w-full mt-3 col-span-3">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          name="search-chip"
          id=""
        />
        <div className="overflow-y-scroll h-32">
          {topic === "genres" ? (
            <>
              {genreSeeds.map((seed) => (
                <p
                  key={seed}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      [topic]: [...filters[topic], seed],
                    })
                  }
                >
                  {seed}
                </p>
              ))}
            </>
          ) : (
            <>
              {listItems.map((seed) => (
                <p
                  className="flex text-zinc-300 gap-2"
                  key={(seed as track | artist).name}
                  onClick={() => {
                    setFilters({
                      ...filters,
                      [topic]: [...filters[topic], seed],
                    })
                    setListItems([])
                  }
                  }
                >
                  <img className="w-12 h-12" src={topic === "artists" ? (seed as artist).images[0].url : (seed as track).album.images[0].url} />
                  <div className="flex flex-col">
                    <span className="text-sm">
                      {(seed as track | artist).name}
                    </span>
                    {topic === "tracks" && (
                      <span className="text-zinc-400 text-xs">
                        {(seed as track).artists.map((artist) => artist.name).join(" • ")}
                      </span>
                    )}
                  </div>
                </p>
              ))}
            </>
          )}
        </div>
      </div>
      )}
    </div>
    </div>
  );
};

export default FilterSearch;
