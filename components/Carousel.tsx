import { artist } from "./Card";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const indexes = [0, 1, 2, 3];

const Carousel = ({ items }: { items: Array<artist> }) => {
  const [active, setActive] = useState(0);
  const [x, setDirection] = useState<number>();
  return (
    <>
      <div
        className='w-full h-[calc(100%_-_0.5rem)] overflow-hidden absolute
       after:absolute after:w-full after:h-1/5 after:bg-gradient-to-t after:from-black after:via-black/70 after:to-transparent after:bottom-0 after:z-50 after:pointer-events-none'
      >
        <AnimatePresence initial={false}>
          <motion.div
            layoutId='primary'
            initial={{ x }}
            animate={{ x: 0 }}
            exit={{ x: x! * -2.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            key={items[active].id}
            dragElastic={1}
            onDragEnd={(e, info) => {
              const { velocity, offset } = info;
              if (offset.x * velocity.x > 10000) {
                // determine direction and switch
                const d = offset.x > 0 ? -300 : 300;
                setDirection(d);
              }
            }}
          >
            <img
              className='w-full object-cover absolute'
              src={items[active].images[0].url}
            />
          </motion.div>
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
              const d = index > active ? -300 : 300;
              setActive(index);
              setDirection(d);
            }}
            key={index}
            className={`border-bar ${index === active && "bg-zinc-700"}`}
          />
        ))}
      </div>
    </>
  );
};
export default Carousel;
