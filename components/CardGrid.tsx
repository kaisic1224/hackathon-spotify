import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { memo } from "react";
import { Suspense } from "react";
import Card, { artist, playlistItem, track } from "./Card";
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
      whileInView='show'
      viewport={{ once: true }}
      className='grid justify-items-center mx-auto
       xs:gap-12
       md:grid-cols-2
       xl:grid-cols-4 xl:gap-10 
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
