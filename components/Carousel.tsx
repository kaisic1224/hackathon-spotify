import { artist } from "../lib/api.d";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const indexes = [0, 1, 2, 3];

const getNextPosition = (
  min: number,
  max: number,
  current: number,
  direction: number
): number => {
  let next = 0;
  if (current === max && direction > 0) {
    next = 0;
  } else if (current === min && direction < 0) {
    next = max;
  } else {
    next = current + direction;
  }
  return next;
};

const Carousel = ({ items }: { items: Array<artist> }) => {
  const [active, setActive] = useState(0);
  const [x, setDirection] = useState<number>();
  return (
    <>
      <div
        className='w-full h-[calc(100%_-_0.5rem)] overflow-hidden absolute
       after:absolute after:w-full after:h-1/5 after:bg-gradient-to-t after:from-black/80 after:to-transparent after:bottom-0 after:z-50 after:pointer-events-none'
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={items[active].id}
            initial={{ x, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -x!, opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 200, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, info) => {
              const { velocity, offset } = info;
              if (offset.x * velocity.x < 10000) return;
              // determine direction and switch
              const d = offset.x > 0 ? -500 : 500;
              setDirection(d);
              const nextPosition = getNextPosition(0, 3, active, d / 500);
              setActive(nextPosition);
            }}
            className='w-full object-cover absolute'
            src={items[active].images[0].url}
          />
        </AnimatePresence>
        <div className='z-[60] bottom-2 absolute ml-4 text-white flex flex-col'>
          <h2 className='flex gap-2 items-center mb-0'>
            <img
              src={items[active].images[0].url}
              alt=''
              className='h-6 w-6 object-cover rounded-full'
            />
            {items[active].name}
          </h2>
          <span className='text-xs text-zinc-400'>
            {items[active].genres.map((genre) => genre + " • ")}
            {items[active].followers.total.toLocaleString() + " ♥"}
          </span>
        </div>
      </div>
      <div className='absolute bottom-0 z-[99] flex w-full h-2'>
        {indexes.map((index) => (
          <div
            onClick={() => {
              const d = index > active ? 500 : -500;
              setDirection(d);
              setActive(index);
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
