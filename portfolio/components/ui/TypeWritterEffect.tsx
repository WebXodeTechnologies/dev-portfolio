"use client";

import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  typingSpeed = 100,
  pauseDuration = 2000,
  deleteSpeed = 50,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  typingSpeed?: number;
  pauseDuration?: number;
  deleteSpeed?: number;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex].text;
    let typingTimeout: NodeJS.Timeout;

    if (isDeleting) {
      typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
      if (displayedText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      typingTimeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, typingSpeed);
      if (displayedText === currentWord) {
        typingTimeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    }

    return () => clearTimeout(typingTimeout);
  }, [
    displayedText,
    isDeleting,
    currentWordIndex,
    words,
    typingSpeed,
    pauseDuration,
    deleteSpeed,
  ]);

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-4xl font-normal text-center",
        className
      )}
    >
      <AnimatePresence>
        <motion.span
          key={currentWordIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayedText}
        </motion.span>
      </AnimatePresence>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block align-bottom ml-1 rounded-sm w-[2px] h-[1em] bg-purple-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
