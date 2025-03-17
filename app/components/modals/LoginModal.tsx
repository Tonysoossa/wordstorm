"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../assets/languages/LanguagesContext";
import {
  SignInButton,
  SignUpButton,
  SignedOut,
  SignOutButton,
  SignedIn,
} from "@clerk/nextjs";
import userCoo from "@/clerck/userCoo";

export default function RulesModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const { translations } = useLanguage();

  const [isLog] = useState(true);

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
              <div className="text-black flex gap-4">
                <div
                  className="border-2
                p-1 border-black"
                >
                  <SignedOut>
                    <SignInButton mode="modal" />
                  </SignedOut>
                </div>
                <div
                  className="border-2
                p-1 border-black"
                >
                  <SignedOut>
                    <SignUpButton mode="modal" />
                  </SignedOut>
                  <SignedIn>
                    <SignOutButton />
                  </SignedIn>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// NOTE ADD these for signup form :  <SignedOut>
// <SignInButton />
// <SignUpButton />
// </SignedOut>
// <SignedIn>
/* <UserButton /> */
/* </SignedIn>  */
