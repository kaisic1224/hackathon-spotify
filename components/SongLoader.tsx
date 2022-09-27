import { FaEllipsisH } from "react-icons/fa";

const SongLoader = () => {
  return (
    <div className='grid grid-cols-4 justify-items-start items-center pr-11 select-none'>
      <div className='object-cover aspect-square w-20 select-none bg-black-main' />
      <span className='min-w-[25ch] bg-gray-700 h-[2ch] rounded-full animate-pulse justify-self-start' />
      <span className='min-w-[25ch] bg-gray-700 h-[2ch] rounded-full animate-pulse justify-self-end' />
      <div className='relative justify-self-end'>
        <FaEllipsisH className='rounded-full w-6 h-6 p-1 cursor-pointer hover:bg-card-accent' />
      </div>
    </div>
  );
};
export default SongLoader;
