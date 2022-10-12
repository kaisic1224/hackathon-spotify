import { motion } from "framer-motion";

const bars = {
  hidden: {
    scaleY: 0
  },
  show: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      repeat: 1,
      repeatType: "mirror" as "mirror",
      repeatDelay: 2
    }
  }
};

const screen = {
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const PageBars = ({ direction }: { direction: string }) => {
  return (
    <motion.div
      variants={screen}
      initial='hidden'
      animate='show'
      className={`absolute grid inset-0 z-[9999] pointer-events-none ${
        direction === "top" ? "grid-cols-5" : "grid-rows-5"
      }`}
    >
      <motion.div
        className='page-bars'
        style={{ transformOrigin: "top" }}
        variants={bars}
      />
      <motion.div
        className='page-bars'
        style={{ transformOrigin: "top" }}
        variants={bars}
      />
      <motion.div
        className='page-bars'
        style={{ transformOrigin: "top" }}
        variants={bars}
      />
      <motion.div
        className='page-bars'
        style={{ transformOrigin: "top" }}
        variants={bars}
      />
      <motion.div
        className='page-bars'
        style={{ transformOrigin: "top" }}
        variants={bars}
      />
    </motion.div>
  );
};
export default PageBars;
