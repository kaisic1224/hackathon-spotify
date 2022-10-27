import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { track } from "../lib/api.d";

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
      className='grid overflow-visible pb-6 grid-cols-5 px-2 isolate pt-6 min-h-full'
      variants={sliderVars}
      initial='hidden'
      animate='show'
      style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
    >
      <motion.li
        key={tracks[0].id}
        variants={vars}
        className='shadow-lg relative'
        style={{
          rotateX: -25,
          rotateY: 55,
          rotateZ: 5,
          perspective: "800px",
          transformStyle: "preserve-3d"
        }}
        whileHover={{ rotateX: 0, rotateY: 0, rotateZ: 0, translateY: -25 }}
        transition={{
          duration: 0.25,
          rotateX: { delay: 0.5, duration: 0.25 },
          rotateY: { delay: 0.5, duration: 0.25 },
          rotateZ: { delay: 0.5, duration: 0.25 }
        }}
      >
        <span>{tracks[0].name}</span>
        <img
          className='aspect-square object-cover'
          src={tracks[0].album.images[1].url}
          alt={`${tracks[0].name} by ${
            tracks[0].artists.length === 1
              ? tracks[0].artists[0].name
              : tracks[0].artists.map((artist) => artist.name).join(" and ")
          }'s album cover`}
        />
      </motion.li>
      <motion.li
        key={tracks[1].id}
        variants={vars}
        className='shadow-lg relative z-40'
        style={{
          rotateX: -25,
          rotateY: 50,
          rotateZ: 5,
          perspective: "800px",
          transformStyle: "preserve-3d"
        }}
        whileHover={{ rotateX: 0, rotateY: 0, rotateZ: 0, translateY: -25 }}
        transition={{
          duration: 0.25,
          rotateX: { delay: 0.5, duration: 0.25 },
          rotateY: { delay: 0.5, duration: 0.25 },
          rotateZ: { delay: 0.5, duration: 0.25 }
        }}
      >
        <span className='text-ellipsis whitespace-nowrap  max-w-[24ch]'>
          {tracks[1].name}
        </span>
        <img
          className='aspect-square object-cover'
          src={tracks[1].album.images[1].url}
          alt={`${tracks[1].name} by ${
            tracks[1].artists.length === 1
              ? tracks[1].artists[0].name
              : tracks[1].artists.map((artist) => artist.name).join(" and ")
          }'s album cover`}
        />
      </motion.li>
      <motion.li
        key={tracks[2].id}
        variants={vars}
        className='shadow-lg relative z-50'
        style={{
          rotateX: -18,
          rotateY: 50,
          perspective: "800px",
          transformStyle: "preserve-3d"
        }}
        whileHover={{
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          translateY: -25
        }}
        transition={{
          duration: 0.25,
          rotateX: { delay: 0.5, duration: 0.25 },
          rotateY: { delay: 0.5, duration: 0.25 },
          rotateZ: { delay: 0.5, duration: 0.25 }
        }}
        onTransitionEnd={() => console.log("jaja")}
      >
        <span>{tracks[2].name}</span>
        <img
          className='aspect-square object-cover'
          src={tracks[2].album.images[1].url}
          alt={`${tracks[2].name} by ${
            tracks[2].artists.length === 1
              ? tracks[2].artists[0].name
              : tracks[2].artists.map((artist) => artist.name).join(" and ")
          }'s album cover`}
        />
      </motion.li>
      <motion.li
        key={tracks[3].id}
        variants={vars}
        className='shadow-in relativener z-40'
        style={{
          rotateX: -25,
          rotateY: 50,
          rotateZ: -5,
          perspective: "800px",
          transformStyle: "preserve-3d"
        }}
        whileHover={{ rotateX: 0, rotateY: 0, rotateZ: 0, translateY: -25 }}
        transition={{
          duration: 0.25,
          rotateX: { delay: 0.5, duration: 0.25 },
          rotateY: { delay: 0.5, duration: 0.25 },
          rotateZ: { delay: 0.5, duration: 0.25 }
        }}
      >
        <span className='text-ellipsis'>{tracks[3].name}</span>
        <img
          className='aspect-square object-cover shadow-in relativener'
          src={tracks[3].album.images[1].url}
          alt={`${tracks[3].name} by ${
            tracks[3].artists.length === 1
              ? tracks[3].artists[0].name
              : tracks[3].artists.map((artist) => artist.name).join(" and ")
          }'s album cover`}
        />
      </motion.li>
      <motion.li
        key={tracks[4].id}
        variants={vars}
        className='shadow-lg relative'
        style={{
          rotateX: -25,
          rotateY: 50,
          rotateZ: -5,
          perspective: "800px",
          transformStyle: "preserve-3d"
        }}
        whileHover={{ rotateX: 0, rotateY: 0, rotateZ: 0, translateY: -25 }}
        transition={{
          duration: 0.25,
          rotateX: { delay: 0.5, duration: 0.25 },
          rotateY: { delay: 0.5, duration: 0.25 },
          rotateZ: { delay: 0.5, duration: 0.25 }
        }}
      >
        <span>{tracks[4].name}</span>
        <img
          className='aspect-square object-cover'
          src={tracks[4].album.images[1].url}
          alt={`${tracks[4].name} by ${
            tracks[4].artists.length === 1
              ? tracks[4].artists[0].name
              : tracks[4].artists.map((artist) => artist.name).join(" and ")
          }'s album cover`}
        />
      </motion.li>
    </motion.ul>
  );
};
export default Display;
