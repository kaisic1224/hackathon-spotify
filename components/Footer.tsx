import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className='relative text-center bg-card-base text-white px-8 mx-auto'>
      <span className='font-semibold'>Share with your friends!</span>
      <motion.div
        className='bg-g-primary'
        initial={{ width: 0, height: 2 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </footer>
  );
};
export default Footer;
