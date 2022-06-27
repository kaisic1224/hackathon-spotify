import { FaRegCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
const Toast = () => {
  return (
    <>
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        style={{ left: "50%", translateX: "-50%" }}
        className='fixed p-4 bg-card-accent top-12 z-[9999] flex items-center text-lg gap-3 font-semibold text-white rounded-md'
      >
        Copied to clipboard! <FaRegCheckCircle />
      </motion.div>
    </>
  );
};
export default Toast;
