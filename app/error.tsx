"use client";

export default function error() {
  const reload = () => window.location.reload();
  return (
    <div className="flex flex-col text-lg gap-4">
      <p>An error Occulted</p>
      <p>Try again ?</p>
      <button
        onClick={reload}
        className="bg-gradient-to-b hover:from-[#51e910] hover:to-[#bed89f] bg-white from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-md px-3 hover:scale-110 duration-300 transform hover:translate-y-1 max-md:w-52 self-center h-8"
      >
        Reload
      </button>
    </div>
  );
}
