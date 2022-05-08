import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card, { track } from "./Card";

const vars = {
  hidden: {
    y: "100%",
    opacity: 0
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 1
    }
  }
};

const sliderVars = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1
    }
  }
};

const Display = ({ items }: { items: track[] }) => {
  const [tracks, settracks] = useState(items);
  useEffect(() => {
    settracks([...items]);
  }, []);

  return (
    <motion.ul
      className='flex gap-2 overflow-x-auto overflow-y-hidden pb-2'
      variants={sliderVars}
      initial='hidden'
      animate='show'
    >
      {tracks.map((track) => {
        return (
          <motion.li
            variants={vars}
            className='shadow-2xl'
            style={{
              rotateX: -45,
              perspective: "800px",
              transformStyle: "preserve-3d"
            }}
            whileHover={{ rotateX: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card song={track} key={track.id} />
          </motion.li>
        );
      })}
    </motion.ul>
  );
};
export default Display;
