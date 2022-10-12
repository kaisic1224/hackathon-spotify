import { useMouseCoordinates } from "../lib/useMouseCoordinates";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Mouse = () => {
  const { x, y, width, height } = useMouseCoordinates();

  return (
    <motion.div
      animate={{ x, y }}
      transition={{ delay: 0.15, velocity: 15 }}
      className='mouse-follow'
    />
  );
};
export default Mouse;
