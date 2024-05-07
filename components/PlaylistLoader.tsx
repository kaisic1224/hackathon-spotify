import { IoMdOptions } from "react-icons/io";
import SongLoader from "./SongLoader";

const temp = [0, 1, 2, 3, 4, 5, 6, 7];

const PlaylistLoader = () => {
  return (
    <>
      <div className='flex flex-col max-w-screen mx-auto relative px-5'>
          <div
            className='text-zinc-500 font-bold uppercase flex items-center gap-1'
          >
            Filters <IoMdOptions />
          </div>

          <div className='chip-row hidden-scrollbar'>
            {temp.map((itm) => (
              <div
                key={itm}
                tabIndex={0}
                className='chip text-card-accent border-card-base focus:bg-body-main focus:border-card-accent'
              >
                ...
              </div>
            ))}
          </div>
      </div>
      <div className='shadow-lg pt-4
                      md:w-[calc(100%_-_2rem)]'>
        <div className='flex items-center text-2xl pr-8 gap-4 bg-body-main'>
          <div className='relative'>
            <div className='object-cover aspect-square w-36 peer bg-black-main' />
          </div>
          <div className='min-w-[12rem] h-[3ch] bg-black-main animate-pulse rounded-lg' />
        </div>
        <div className='h-[320px] overflow-y-hidden'>
          <SongLoader />
          <SongLoader />
          <SongLoader />
          <SongLoader />
          <SongLoader />
          <SongLoader />
          <SongLoader />
          <SongLoader />
        </div>
      </div>
      <button
        className={`font-semibold text-white text-xl mx-auto block mt-3 bg-card-base rounded-lg py-[.5em] px-[1.25em] hover:bg-card-accent`}
      >
        Create!
      </button>
    </>
  );
};
export default PlaylistLoader;
