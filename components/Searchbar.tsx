import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function debounce(f: Function, t: number) {
  let timer: any;
  return (...params: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      f(...params);
    }, t);
  };
}

const Searchbar = () => {
  const [search, setSearch] = useState("");

  const searchHandler = async (query: string) => {
    const q = new URLSearchParams({ q: query });
    const response = await fetch("/api/search?" + q.toString());

    const data = await response.json();

    console.log(data);
  };

  const debouncedDay = useCallback(
    debounce((s: string) => {
      searchHandler(s);
    }, 5000),
    []
  );

  useEffect(() => {
    debouncedDay(search);
  }, [search]);

  return (
    <div
      className='relative max-w-[calc(100%_-_2rem)] mx-auto my-3 
    after:absolute after:-inset-2 after:border after:border-card-accent/60 after:rounded-md focus:after:border-0 after:pointer-events-none'
    >
      <input
        className='search'
        type='text'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FaSearch className='absolute top-1/2 left-2 -translate-y-1/2 w-5 h-5 fill-zinc-700' />
    </div>
  );
};
export default Searchbar;
