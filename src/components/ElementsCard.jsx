import React from "react";
import { FiPlus, FiDownload, FiCompass, FiFigma } from "react-icons/fi";

const cards = [
    {
        type: "button",
        content: (
            <button className="border-2 border-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FiDownload />
                Download
            </button>
        ),
    },
    {
        type: "button",
        content: (
            <button className="bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-2 rounded-lg text-white shadow-xl">
                Button
            </button>
        ),
    },
    {
        type: "code",
        content: (
            <div className="space-y-2 text-white text-center">
                <div className="w-4 h-4 bg-teal-500 rounded-full mx-auto mb-2"></div>
                <div className="w-6 h-1 bg-white mx-auto rounded-full" />
                <div className="w-10 h-1 bg-white mx-auto rounded-full" />
                <div className="w-16 h-1 bg-white mx-auto rounded-full" />
                <p className="text-sm mt-4 opacity-80">{'</> Get code'}</p>
            </div>
        ),
    },
    {
        type: "checkboxes",
        content: (
            <form className="space-y-2 text-white">
                {["Checkbox 1", "Checkbox 2", "Checkbox 3", "Checkbox 4"].map((label, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked={i === 1} />
                        <label>{label}</label>
                    </div>
                ))}
            </form>
        ),
    },
    {
        type: "button",
        content: (
            <button className="border border-white px-6 py-2 rounded-full text-white font-medium">
                Explore
            </button>
        ),
    },
    {
        type: "button",
        content: (
            <button className="bg-gradient-to-r from-purple-500 to-blue-400 px-6 py-2 rounded-full text-white font-medium">
                Get started
            </button>
        ),
    },
    {
        type: "button",
        content: (
            <button className="bg-lime-400 px-4 py-2 text-black rounded-full flex items-center gap-2 font-semibold">
                <FiCompass />
                Explore
            </button>
        ),
    },
    {
        type: "loading-bar",
        content: (
            <div className="bg-black w-full h-10 rounded-md flex items-center justify-center">
                <div className="w-4 h-1 bg-white mx-1" />
                <div className="w-4 h-1 bg-white mx-1" />
                <div className="w-4 h-1 bg-white mx-1" />
            </div>
        ),
    },
    {
        type: "status",
        content: (
            <div className="border border-gray-700 p-3 rounded-md w-full text-green-400 font-mono text-sm">
                <div className="flex items-center justify-between mb-1 text-white">
                    <span>Status</span>
                    <span className="flex gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    </span>
                </div>
                <p>Loading..</p>
            </div>
        ),
    },
    {
        type: "icon-button",
        content: (
            <button className="w-10 h-10 border-2 border-gray-500 rounded-full text-white text-2xl flex items-center justify-center">
                <FiPlus />
            </button>
        ),
    },
];

const ElementsCard = () => {
    return (
        <div className="bg-[#1111114f] px-4 py-4 shadow-2xl !shadow-white/20">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-[#1c1c1c] rounded-xl p-6 flex justify-center items-center"
                    >
                        {card.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ElementsCard;
