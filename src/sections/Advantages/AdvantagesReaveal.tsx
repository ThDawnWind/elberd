"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
}

export function AdvantageReveal({ children, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}