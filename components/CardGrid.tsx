import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { artist, playlistItem, track } from "../lib/api.d";
import Card from "./Card";
import CardLoader from "./CardLoader";

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
  layoutID?: string;
  dataItems: playlistItem[] | track[] | artist[];
}) => {
  return (
    <motion.div
      variants={staggerFadeUp}
      initial='hidden'
      animate='show'
      viewport={{ once: true }}
      className='grid justify-items-center mx-auto pb-2 hidden-scrollbar gap-12 
       xs:max-w-screen xs:grid-flow-col-dense xs:overflow-x-auto
       xl:gap-10 xl:px-4
       2xl:max-w-screen-2xl'
    >
      <LayoutGroup id={layoutID}>
        {dataItems.map((item) => (
          <Card
            key={
              (item as playlistItem).track?.id ?? (item as track | artist).id
            }
            song={item}
          />
        ))}
      </LayoutGroup>
    </motion.div>
  );
};
export default CardGrid;
