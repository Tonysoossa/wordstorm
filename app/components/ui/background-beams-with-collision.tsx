"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const beams = [
    { translateX: 600, duration: 3, delay: 4 },
    { translateX: 100, duration: 9, className: "h-6" },
    { translateX: 400, duration: 5, delay: 4 },
    { translateX: 800, duration: 11, className: "h-20" },
    { translateX: 650, duration: 14, className: "h-8" },
    { translateX: 700, duration: 7, className: "h-22" },
    { translateX: 1000, duration: 7, className: "h-12" },
    { translateX: 1200, duration: 7, delay: 2.5, className: "h-6" },
    { translateX: 1300, duration: 6, delay: 2, className: "h-6" },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-black relative w-full justify-center overflow-hidden",
        className
      )}
    >
      {beams.map((beam, i) => (
        <motion.div
          key={`beam-${i}`}
          initial={{ y: -200, x: beam.translateX }}
          animate={{ y: 1800 }}
          transition={{
            duration: beam.duration || 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: beam.delay || 0,
          }}
          className={cn(
            "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-white via-yellowCustom to-transparent",
            beam.className
          )}
        />
      ))}
      {children}
      <div
        className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};
