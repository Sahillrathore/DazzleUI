import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaRocket } from "react-icons/fa";
import { MdOutlineElectricBolt } from "react-icons/md";

const HeroSection = () => {
  const words = ["Awesome", "Creative", "Modern", "Engaging"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  // longest word used to reserve space so layout doesn't jump
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b));

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setAnimate(false);
      }, 500); // duration of blur/out
    }, 3000); // time between swaps

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative text-white py-12 md:py-20 px-4 md:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-4 bg-white/10 py-1 px-3 rounded-full border border-white/20 text-xs md:text-sm">
          <FaRocket className="text-green-400 w-3 h-3 md:w-4 md:h-4" />
          <span className="text-green-400 font-medium">16 NEW ELEMENTS THIS WEEK!</span>
        </div>

        {/* Heading */}
        <h1 className="mt-4 md:mt-6 font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight md:leading-[1.03]">
          <span className="block">
            Make Your Websites
          </span>

          <span className="block mt-2 text-zinc-50">
            Look 10x{" "}
            <div
              className="relative ml-2 inline-block align-middle"
              style={{ minWidth: `${longestWord.length}ch` }}
              aria-hidden={false}
            >
              <span
                key={currentWordIndex}
                className={clsx(
                  "inline-block px-2  relative text-start sm:-top-4 sm:-left-10 h-full py-0 rounded-md font-extrabold leading-none transition-all duration-500 ease-in-out transform",
                  // transform + opacity gives smoother non-janky animation for small viewports
                  animate ? "translate-y-3 blur-sm opacity-0" : "translate-y-0 blur-0 opacity-100",
                  "text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl"
                )}
                role="text"
                aria-live="polite"
              >
                {words[currentWordIndex]}
              </span>
            </div>
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 mt-4 md:mt-6 text-sm md:text-base">
          Community-built library of UI elements.
          <br className="hidden sm:block" />
          Copy as HTML/CSS, Tailwind, React and Figma.
        </p>

        {/* Search bar */}
        <div className="mt-8 md:mt-10 flex justify-center px-2">
          <div className="w-full max-w-lg">
            <form
              role="search"
              className="flex items-center bg-zinc-800 rounded-xl pl-3 pr-2 py-2 md:py-3 hover:scale-[1.02] transform transition-transform"
              onSubmit={(e) => e.preventDefault()}
            >
              <svg
                className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>

              <label htmlFor="hero-search" className="sr-only">Search components</label>
              <input
                id="hero-search"
                type="text"
                placeholder="Search for components, styles, creators..."
                className="bg-transparent outline-none text-sm md:text-base text-gray-300 flex-1 min-w-0"
                aria-label="Search components, styles, creators"
              />

              <button
                type="submit"
                className="ml-3 px-3 py-2 md:px-4 md:py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white text-sm md:text-base font-medium transition-colors"
                aria-label="Search"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative bolt — large, low-contrast, responsive and hidden on small screens */}
      <div className="pointer-events-none hidden lg:block absolute right-6 top-1/4 translate-y-0 opacity-5">
        <MdOutlineElectricBolt className="text-[18rem] lg:text-[20rem] xl:text-[22rem]" />
      </div>

      {/* Smaller decorative bolt for medium screens (keeps composition stable) */}
      <div className="pointer-events-none hidden md:block lg:hidden absolute right-4 top-1/3 opacity-6">
        <MdOutlineElectricBolt className="text-[12rem] md:text-[14rem]" />
      </div>
    </section>
  );
};

export default HeroSection;
