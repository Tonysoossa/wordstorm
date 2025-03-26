"use client";

import { handleServerDelete } from "@/app/api/deleteUser/route";

const DeleteUserButton = () => {
  const handleClick = async () => {
    try {
      const result = await handleServerDelete();
      console.log("Server action result:", result);
    } catch (error) {
      console.error("Error executing server action:", error);
    }
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-red-500 shadow-[3px_3px_5px_0.5px_#fff6af] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-28  hover:scale-110 hover:shadow-[-3px_3px_5px_0.5px_#fff6af]"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteUserButton;
