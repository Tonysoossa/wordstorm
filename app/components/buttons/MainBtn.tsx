import { SignInButton } from "@clerk/nextjs";

export default function MainBtn() {
  return (
    <div className="flex justify-center pt-20 gap-16 mx-auto">
      <button
        className="shadow-[-3px_3px_5px_0.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] 
                   rounded-[30px] border border-white 
                   inline-block cursor-pointer text-black 
                   font-silkscreen text-lg w-28 hover:bg-gradient-to-b hover:scale-110 z-45 h-10"
      >
        Play !
      </button>
      <SignInButton mode="modal">
        <button
          className="shadow-[3px_3px_5px_0.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] 
                   rounded-[30px] border border-white 
                   inline-block cursor-pointer text-black 
                   font-silkscreen text-lg w-28 hover:bg-gradient-to-b hover:scale-110 z-45 h-10"
        >
          Log
        </button>
      </SignInButton>
    </div>
  );
}
