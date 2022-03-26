import Image from "next/image";
import { motion } from "framer-motion";

export interface card {
  title: string;
  image: string;
}

const variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
    },
  },
};

const Card = ({ strung }: { strung: string }) => {
  return (
    <motion.div
      viewport={{ once: true }}
      initial="hidden"
      whileInView="show"
      variants={variants}
      className="bg-body-main hover:bg-g-primary min-w-[300px] min-h-[300px] text-white p-4 rounded-xl"
    >
      {strung}
    </motion.div>
  );
};
export default Card;
