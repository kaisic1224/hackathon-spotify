import { AnimatePresence, motion } from "framer-motion";
import Card, { playlistItem, track } from "./Card";

const staggerFadeUp = {
  show: {
    transition: {
      staggerChildren: 0.1
    }
  },
  layout: {
    transition: {
      duration: 1,
      staggerChildren: 0.6
    }
  }
};

const CardGrid = ({ dataItems }: { dataItems: playlistItem[] | track[] }) => {
  return (
    <motion.div
      variants={staggerFadeUp}
      initial='hidden'
      animate='show'
      layout='position'
      className='grid grid-cols-4 gap-6 justify-items-center px-4 overflow-hidden'
    >
      {dataItems.map((item) => (
        <Card key={item.track?.id ?? item.id} song={item} />
      ))}
    </motion.div>
  );
};
export default CardGrid;
