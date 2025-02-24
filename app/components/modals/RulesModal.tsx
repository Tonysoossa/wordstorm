"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../assets/languages/LanguagesContext";

export default function RulesModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const { translations } = useLanguage();

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
              <h2 className="text-2xl text-gray-900 mb-2 -mt-4">
                {translations.rulesModal.title}
              </h2>
              <div className="gap-2 flex flex-col text-gray-800 text-sm font-geistMono">
                <p>{translations.rulesModal.base}</p>
                <p>{translations.rulesModal.soloTitle}</p>
                <p>{translations.rulesModal.soloText}</p>
                <p>{translations.rulesModal.multiTitle}</p>
                <p>{translations.rulesModal.multiText}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
