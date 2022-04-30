import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Card, { artist, playlistItem, track } from "./Card";

const staggerFadeUp = {
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const CardGrid = ({
  dataItems,
  layoutID
}: {
  layoutID: string;
  dataItems: playlistItem[] | track[] | artist[];
}) => {
  return (
    <motion.div
      variants={staggerFadeUp}
      initial='hidden'
      animate='show'
      className='grid px-8 mx-auto justify-items-center
       xs:gap-12
       md:grid-cols-2
       xl:grid-cols-4 xl:gap-10
       2xl:max-w-screen-2xl'
    >
      <LayoutGroup id={layoutID}>
        {dataItems.map((item) => (
          <Card key={item.track?.id ?? item.id} song={item} />
        ))}
      </LayoutGroup>
    </motion.div>
  );
};
export default CardGrid;
