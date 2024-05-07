import { useRouter } from "next/router";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import useMedia from "../lib/useMedia";
//#121212
const links = [
  ["Most Recent", "#most-recent", "Recent"],
  ["Favourite Artists", "#most-listened-artists", "Artists"],
  ["Favourite Songs", "#most-listened-songs", "Songs"],
  ["Playlists Made For You", "#customized-playlists", "Playlists"]
];
const SNavbar = ({ viewedSection }: { viewedSection: string }) => {
  const router = useRouter();
  const width = useMedia();
  return (
    <nav
      className='fixed top-0 w-screen z-[9999] text-zinc-300 font-semibold text-normal bg-card-base
    px-2 py-2 
    md:px-4'
    >
      <div
        className='mx-auto flex items-center
        xl:max-w-6xl
        lg:max-w-4xl
        md:max-w-[720px] md:gap-2
        sm:max-w-2xl
      '
      >
        <div
          className='cursor-pointer flex items-center text-lg'
          onClick={() => {
            window.scrollTo(0, 0);
            router.push("/", undefined, { shallow: true });
          }}
        >
          <img
            src='/photos/spotify-logo.png'
            width='30'
            height='30'
            className='d-inline-block align-top mr-2'
          />
          SubWoofer
        </div>
        <ul className='flex items-center justify-center gap-2 mb-0 ml-auto pr-2'>
          <AnimatePresence initial={false}>
            {links.map((ind) => {
              return (
                <li className='relative' key={ind[1]}>
                  <Link href={ind[1]}>
                    <a className='no-underline text-zinc-300/70 hover:text-zinc-400/70'>
                      {width! <= 840 ? ind[2] : ind[0]}
                    </a>
                  </Link>
                  {viewedSection === ind[0] && (
                    <motion.div
                      className='w-full absolute left-0 -bottom-1 h-[2px] rounded-xl bg-g-primary'
                      layoutId='underline'
                    />
                  )}
                </li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </nav>
  );
};

export default SNavbar;
