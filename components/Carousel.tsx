import { artist } from "../lib/api.d";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const indexes = [0, 1, 2, 3];

const getNextPosition = (
  min: number,
  max: number,
  current: number,
  direction: number
): number => {
  const currentAndDirection = current + direction / 500;
  //go from last to first
  if (currentAndDirection > max) {
    return 0;
    // go from first to last
  } else if (currentAndDirection < min) {
    return max;
  } else {
    return currentAndDirection;
  }
};

const vars = {
  enter: (direction: number) => {
    return {
      x: direction,
      opacity: 0
    };
  },
  show: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      x: -direction,
      opacity: 0,
      zIndex: 0
    };
  }
};

const Carousel = ({ items }: { items: Array<artist> }) => {
  const [[x, active], setActive] = useState([0, 0]);
  return (
    <>
      <div
        className='w-full h-full overflow-hidden absolute
       after:absolute after:w-full after:h-1/5 after:bg-gradient-to-t after:from-black/90 after:to-transparent after:bottom-0 after:z-50 after:pointer-events-none'
      >
        <AnimatePresence initial={false} custom={x}>
          <motion.img
            variants={vars}
            key={items[active].id}
            initial='enter'
            animate='show'
            exit='exit'
            transition={{
              x: { type: "spring", stiffness: 200, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            custom={x}
            onDragEnd={(e, info) => {
              const { velocity, offset } = info;
              if (offset.x * velocity.x < 10000) return;
              // determine direction and switch
              const d = offset.x > 0 ? -500 : 500;
              const nextPosition = getNextPosition(0, 3, active, d);
              // find another way to manage current index - state gets batched and direction get messed up sometimes
              // solution - combine your state call into one action
              setActive([d, nextPosition]);
            }}
            className='w-full object-cover absolute'
            src={items[active].images[0].url}
            alt={`Profile picture for ${items[active].name}`}
          />
        </AnimatePresence>
        <div className='z-[60] bottom-4 absolute ml-4 text-white flex flex-col'>
          <h2 className='flex gap-2 items-center mb-0'>
            <img
              src={items[active].images[0].url}
              alt={`Profile picture for ${items[active].name}`}
              className='h-6 w-6 object-cover rounded-full'
            />
            {items[active].name}
          </h2>
          <span className='text-xs text-zinc-400 flex items-center gap-1'>
            {items[active].genres.map((genre) => genre + " • ")}
            {items[active].followers.total.toLocaleString()} <FaHeart />
          </span>
        </div>
      </div>
      <div className='absolute bottom-0 z-[99] flex w-full h-2'>
        {indexes.map((index) => (
          <div
            onClick={() => {
              const d = index > active ? 500 : -500;
              setActive([d, index]);
            }}
            key={index}
            className={`border-bar ${
              index === active ? "bg-zinc-700 hover:bg-zinc-600/60" : ""
            }`}
          />
        ))}
      </div>
    </>
  );
};
export default Carousel;
