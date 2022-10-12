import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const page = {
  hidden: {
    opacity: 0,
    y: 100
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const PageTransition = ({
  direction,
  children
}: {
  direction: string;
  children: any;
}) => {
  useEffect(() => {});
  return (
    <>
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          id='main'
          variants={page}
          initial='hidden'
          animate='show'
          exit='hidden'
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default PageTransition;
