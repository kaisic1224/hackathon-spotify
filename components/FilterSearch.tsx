import { IoMdCloseCircle } from "react-icons/io";
import { genreSeeds } from "../lib/genres";
import { FaPlus } from "react-icons/fa";
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { Filters, RecommendedContext } from "./Playlist";
import { debounce } from "./DatePicker";
import { artist, track } from "../lib/api";

const FilterSearch = ({
  topic,
  setFilters,
}: {
  topic: "artists" | "genres" | "tracks";
  setFilters: Dispatch<SetStateAction<Filters>>;
}) => {
  let [search, setSearch] = useState("");
  let [item, setItem] = useState<track | artist | string | null>(null);

  const searchHandler = async (query: string) => {
    if (query.length === 0) return;
    const q = new URLSearchParams({ q: query, type: topic });
    const response = await fetch("/api/search?" + q.toString());

    const data = await response.json();

    setItem(data[topic].items[0]);
  };

  const debouncedDay = useCallback(
    debounce((s: string) => {
      searchHandler(s);
    }, 750),
    []
  );

  useEffect(() => {
    if (search.length === 0) setItem(null);
    debouncedDay(search.trim());
  }, [search]);

  const ctx = useContext(RecommendedContext);
  let filters = ctx?.filters!;

  return (
    <div className="pt-3">
      <span className="filter-seeds">Current seed {topic}</span>
      <ul className="grid grid-cols-3 gap-2 relative">
        {topic === "genres" ? (
          filters[topic].map((itm) => {
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
        ) : (
          filters[topic].map((itm) => {
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
          })
        )}
      </ul>
      <div className="col-span-2 text-zinc-500">Nothing to see here yet!</div>
      <li className="filter-chip grid place-items-center bg-black-tertiary cursor-pointer">
        <FaPlus />
      </li>
      <div className="h-32 w-full col-span-3">
        <div>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name="search-chip"
            id=""
          />
          <div></div>
        </div>
        <div className="overflow-y-scroll h-32">
          {genreSeeds.map((seed) => (
            <p
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
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
