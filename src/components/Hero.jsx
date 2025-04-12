import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaRocket } from "react-icons/fa";
import { MdOutlineElectricBolt } from "react-icons/md";

const HeroSection = () => {

    const words = ["Awesome", "Creative", "Modern", "Engaging"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [animate, setAnimate] = useState(false);

    const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b));

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimate(true);
            setTimeout(() => {
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
                setAnimate(false);
            }, 500); // duration of blur out
        }, 3000); // time between word swaps

        return () => clearInterval(interval);
    }, []);


    return (
        <div className=" text-white py-20 px-4 text-center">
            {/* Badge with icon and avatars */}
            <div className="flex justify-center items-center gap-2 mb-4 bg-white/10 py-1 w-fit px-4 mx-auto rounded-full border border-white/20">
                <FaRocket className="text-green-400 text-sm" />
                <span className="text-green-400 font-normal text-xs">
                    16 NEW ELEMENTS THIS WEEK!
                </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[4] text-white text-center">
                Make Your Websites <br className="hidden md:block" />
                <span className="text-zinc-300">
                    Look 10x{" "}
                    {/* container with fixed width */}
                    <span
                        className="relative inline-block align-middle"
                        style={{ minWidth: `${longestWord.length}ch` }}
                    >
                        {/* inner word with animation */}
                        <span
                            className={clsx(
                                "absolute left-0 -top-10 px-3 py-1 rounded-md transition-all duration-500 ease-in-out",
                                animate ? "blur-sm opacity-0" : "blur-0 opacity-100",
                                "bg-white/10 text-white text-4xl md:text-6xl font-bold"
                            )}
                            key={currentWordIndex}
                        >
                            {words[currentWordIndex]}
                        </span>
                    </span>
                </span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-400 mt-4">
                Community-built library of UI elements.
                <br />
                Copy as HTML/CSS, Tailwind, React and Figma.
            </p>

            {/* Search bar */}
            <div className="mt-10 flex justify-center">
                <div className="flex items-center hover:scale-110 transition-transform bg-zinc-800 rounded-xl pl-4 pr-2 py-3 w-full max-w-lg">
                    <svg
                        className="w-5 h-5 text-gray-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                        ></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for components, styles, creators..."
                        className="bg-transparent outline-none text-sm text-gray-300 flex-1"
                    />
                    <button className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-all">
                        Search
                    </button>
                </div>
            </div>

            <div className="absolute top-36 text-white/5 blur-sm right-16 text-[22rem]">
                <MdOutlineElectricBolt/>
            </div>
            
        </div>
    );
};

export default HeroSection;
