export default function Footer() {
  return (
    <footer>
      <div className="absolute bottom-0 left-0 right-0 z-50 flex justify-center pb-0.5 ml-5 mr-5 max-md:text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Wordstorm Game by Servanin Tony, All
          right reserved.
        </p>
      </div>
    </footer>
  );
}
