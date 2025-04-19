"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../assets/languages/LanguagesContext";
import { handleServerDelete } from "@/app/actions/deleteUser/route";
import { useScore } from "../../context/ScoreContext";

export default function AccountModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const { translations } = useLanguage();
  const { user } = useUser();
  const { lastScore, highScore } = useScore();

  const handleClick = async () => {
    try {
      const result = await handleServerDelete();
      console.log("Server action result:", result);
      window.location.reload();
    } catch (error) {
      console.error("Error executing server action:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer hover:text-yellowCustom hover:scale-110"
      >
        {children}
      </button>
      <AnimatePresence>
        {isOpen && user && (
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
              <div className="text-black">
                <h2 className="text-md pb-4">
                  {translations.account.accountModal.title}
                </h2>
                <div className="font-geistMono text-sm">
                  <h3 className="text-md text-bold pb-2">
                    {translations.account.accountModal.preInfo}
                  </h3>
                  <div className="flex flex-col text-start pl-1 gap-1">
                    <p>
                      {translations.account.accountModal.usernameInfo}{" "}
                      {user.username}
                    </p>
                    <p>
                      {translations.account.accountModal.mailInfo}{" "}
                      {user.emailAddresses[0].emailAddress}
                    </p>
                    <p>
                      {translations.account.accountModal.lastScore}{" "}
                      {lastScore}
                    </p>
                    <p>
                      {translations.account.accountModal.highestScore}{" "}
                      {highScore}
                    </p>
                  </div>
                </div>
                <h2 className="pt-4 pb-2">
                  {translations.account.accountModal.deleteTitle}
                </h2>
                <p className="text-sm font-geistMono text-normal">
                  {translations.account.accountModal.deleteConfirmation}
                </p>
                <div className="flex flex-row gap-4 py-4 pt-8 max-md:flex-col ">
                  <button
                    onClick={closeModal}
                    className="bg-gradient-to-b hover:from-[#51e910] hover:to-[#bed89f] bg-white from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-md px-3 hover:scale-110 duration-300 transform hover:translate-y-1 max-md:w-52 self-center h-8"
                  >
                    {translations.account.accountModal.buttons.keep}
                  </button>
                  <button
                    onClick={handleClick}
                    className="bg-gradient-to-b hover:from-[#e91010] hover:to-[#d87c0a] bg-white from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-md px-3 hover:scale-110 duration-300 transform hover:translate-y-1 max-md:w-52 self-center h-8"
                  >
                    {translations.account.accountModal.buttons.delete}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
