import { FaLock, FaUnlock, FaUserLock } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

const Locked = () => {
  return (
    <div
      aria-disabled
      className='absolute z-50 top-0 bottom-0 w-full bg-gradient-to-b from-transparent via-slate-300 to-slate-200 
       grid place-items-center'
    >
      <div className='items-center gap-4'>
        <motion.div
          className='relative'
          whileTap={{
            left: "-8%",
            transition: {
              duration: 0.1,
              damping: 15,
              repeat: Infinity,
              repeatType: "mirror"
            }
          }}
        >
          <FaUserLock
            className='absolute left-1/2 cursor-not-allowed delay-150
           -translate-y-full -translate-x-1/2 w-40 h-40 hover:fill-red-700 transition-colors duration-300'
          />
        </motion.div>
        <span className='text-3xl'>
          <strong
            className='cursor-pointer hover:text-g-primary'
            onClick={() => signIn()}
          >
            Sign in
          </strong>{" "}
          to unlock
        </span>
      </div>
    </div>
  );
};
export default Locked;
