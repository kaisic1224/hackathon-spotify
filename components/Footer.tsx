import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className='relative text-center bg-card-base text-white px-8 mx-auto pb-9'>
      <span className='font-semibold text-2xl'>Share with your friends!</span>
      <motion.div
        className='bg-g-primary mt-6'
        initial={{ width: 0, height: 2 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </footer>
  );
};
export default Footer;
