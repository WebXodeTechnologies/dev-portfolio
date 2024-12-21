"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -100,
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className={cn(
            "fixed top-10 inset-x-0 mx-auto flex items-center justify-center max-w-fit rounded-full bg-red-500 dark:bg-black border dark:border-white/[0.2] shadow-md z-[5000] px-4 py-2 space-x-6",
            className
          )}
        >
          {navItems.map((navItem, idx) => (
            <Link
              key={`nav-link-${idx}`}
              href={navItem.link}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              {navItem.icon && (
                <span className="text-lg flex-shrink-0">{navItem.icon}</span>
              )}
              <span className="hidden sm:inline">{navItem.name}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
