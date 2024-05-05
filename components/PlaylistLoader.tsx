import SongLoader from "./SongLoader";

const PlaylistLoader = () => {
  return (
    <>
      <div className='shadow-lg pt-4'>
        <div className='flex items-center text-2xl pr-8 gap-4 bg-body-main'>
          <div className='relative'>
            <div className='object-cover aspect-square w-36 peer bg-black-main' />
          </div>
          <div className='min-w-[12rem] h-[3ch] bg-black-main animate-pulse rounded-lg' />
        </div>
        <div className='h-[320px] overflow-y-scroll'>
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
        className={`font-semibold text-xl mx-auto block mt-3 bg-card-base rounded-lg py-[.5em] px-[1.25em] hover:bg-card-accent`}
      >
        Create!
      </button>
    </>
  );
};
export default PlaylistLoader;
