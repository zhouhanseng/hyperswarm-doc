import { ReactNode } from "react";
import { motion } from "framer-motion";

const pageAnimateVariant = {
  exit: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

type Props = {
  children?: ReactNode;
};

export const PageAnimate = ({ children }: Props) => (
  <motion.div
    initial="exit"
    animate="enter"
    exit="exit"
    variants={pageAnimateVariant}
  >
    {children}
  </motion.div>
);
