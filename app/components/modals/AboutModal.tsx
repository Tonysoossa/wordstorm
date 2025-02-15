"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AboutModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer hover:text-yellowCustom hover:scale-110"
      >
        {children}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-60 max-lg:pr-5 max-lg:pl-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-xl max-w-md text-center relative pt-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:scale-125 absolute top-2.5 right-7"
              >
                X
              </button>

              <h2 className="text-2xl text-gray-900 mb-4">
                Bienvenue sur WORDSTOM !
              </h2>
              <p className="text-gray-800 text-base font-geistMono">
                Wordstorm est un jeu interactif conçu pour enrichir votre
                vocabulaire tout en vous amusant. C&apos;est également un projet
                personnel et indépendant, créé dans le but de pratiquer mes
                connaissances et d&apos;apprendre en m&apos;amusant ! Si vous
                souhaitez visiter mon portfolio et/ou le repo de Wordstorm,
                c&apos;est par ici !
              </p>
              <div className="flex justify-around font-geistMono">
                <Link
                  onClick={() => setIsOpen(false)}
                  href="https://portfolio-servanin-tony.vercel.app/"
                  target="_blank"
                  className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 hover:scale-105"
                >
                  Portfolio
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="https://github.com/Tonysoossa/wordstorm"
                  target="_blank"
                  className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 hover:scale-105"
                >
                  Repo Github
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

{
  /* <Link
href="https://github.com/Tonysoossa/wordstorm"
className=" hover:scale-110  hover:text-yellowCustom w-fit"
target="_blank"
>
Repo Github
</Link> */
}
