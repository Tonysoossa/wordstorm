import { SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import DeleteUserButton from "./DeleteUser";

export default function MainBtn() {
  const { isSignedIn } = useUser();

  return (
    <div>
      {!isSignedIn && (
        <div className="flex justify-center pt-20 gap-16 mx-auto ">
          <button className="shadow-[-3px_3px_5px_0.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-28 hover:scale-110 hover:hover:shadow-[3px_3px_5px_0.5px_#fff6af] h-10">
            Play !
          </button>
          <SignInButton mode="modal">
            <button className="shadow-[3px_3px_5px_0.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-28  hover:scale-110 hover:shadow-[-3px_3px_5px_0.5px_#fff6af] h-10">
              Log
            </button>
          </SignInButton>
        </div>
      )}
      {isSignedIn && (
        <div className="flex justify-center gap-12">
          <button className="shadow-[-3px_3px_5px_0.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-28 hover:scale-110 hover:hover:shadow-[3px_3px_5px_0.5px_#fff6af] h-10">
            Play !
          </button>
          <DeleteUserButton />
        </div>
      )}
    </div>
  );
}
