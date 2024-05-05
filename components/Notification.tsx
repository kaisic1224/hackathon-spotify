import { track } from "../lib/api";
import { AnimatePresence, motion } from "framer-motion"

const Notification = ({track}:{track: track | null}) => {
    return (
        <>
            <AnimatePresence>
                {track ? (
                <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    className='fixed left-1/2 top-8 -translate-x-[50%] z-[999] px-8 py-2 text-gray-200 bg-body-main rounded-full shadow'>
                    Added {track.name}
                </motion.div>) : null}
            </AnimatePresence>
       </>
    )
}

export default Notification;