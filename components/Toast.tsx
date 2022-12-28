import { FaRegCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
const Toast = ({ children }: any) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-500%" }}
      style={{ left: "50%", translateX: "-50%" }}
      className='fixed p-6 bg-card-accent top-12 z-[9999] flex items-center text-lg gap-3 font-semibold text-white/90 rounded-md'
    >
      {children}
    </motion.div>
  );
};
export default Toast;
