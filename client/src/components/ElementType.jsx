import React, { useEffect, useState } from 'react';
import { RxButton, RxCross1, RxCross2 } from 'react-icons/rx';
import { RiToggleLine } from 'react-icons/ri';
import { IoMdSwitch, IoMdCheckboxOutline } from 'react-icons/io';
import { FiLoader } from 'react-icons/fi';
import { MdOutlinePowerInput } from "react-icons/md";

const elementsTypes = [
    {
        name: "Button",
        value: "button",
        icon: <RxButton size={40} />
    },
    {
        name: "Toggle",
        value: "toggle",
        icon: <RiToggleLine size={40} />
    },
    {
        name: "Switch",
        value: "switch",
        icon: <IoMdSwitch size={40} />
    },
    {
        name: "Check Box",
        value: "checkbox",
        icon: <IoMdCheckboxOutline size={40} />
    },
    {
        name: "Loader",
        value: "loader",
        icon: <FiLoader size={40} />
    },
    {
        name: "Input",
        value: "input",
        icon: <MdOutlinePowerInput size={40} />
    },
];

const ElementType = ({ isOpen, setIsOpen, formData, setFormdata }) => {

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            
            <div className="bg-[#1a1a1a] rounded-xl p-6 w-[600px] max-w-[90%]">

                <div className='text-white float-right cursor-pointer top-0'
                    onClick={()=>{setIsOpen(!isOpen)}}
                >
                    <RxCross1 />
                </div>
                
                <h2 className="text-white text-2xl font-semibold mb-6 text-center">What are you making?</h2>
                <div className="grid grid-cols-3 gap-4 text-white">
                    {elementsTypes.map((item, i) => (
                        <button onClick={() => setFormdata((prev) => ({ ...prev, type: item.value }))} key={i} className={`p-4 py-6 transition-colors rounded-lg border hover:border-[#4E46E5]  hover:bg-[#2a2a2a] text-center cursor-pointer flex items-center  gap-2 justify-center flex-col ${item.value === formData.type ? 'border-[#4E46E5] bg-[#2a2a2a] ' : 'border-gray-500/50'}`}>
                            {item.icon}
                            <div className="text-lg">{item.name}</div>
                        </button>
                    ))}
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <div className="flex gap-4">
                        <button onClick={() => setFormdata((prev) => ({ ...prev, framework: "css" }))} className={`px-3 py-1.5 flex items-center justify-center gap-2 border border-[#4E46E5] text-white rounded-md bg-[#1e1e1e] ${formData.framework === "css" ? 'border-[#4E46E5] bg-[#2a2a2a] ' : 'border-gray-500/50'}`}>
                            <img src="https://img.icons8.com/fluent/512/css3.png" alt="" className="w-5" />
                            <span>CSS</span>
                        </button>
                        <button onClick={() => setFormdata((prev) => ({ ...prev, framework: "tailwindcss" }))} className={`px-3 py-1.5 flex items-center justify-center gap-2 border  text-white rounded-md bg-[#1e1e1e] ${formData.framework === "tailwindcss" ? 'border-[#4E46E5] bg-[#2a2a2a] ' : 'border-gray-500/50'}`}>
                            <img src="https://static-00.iconduck.com/assets.00/tailwind-css-icon-144x86-czphjb87.png" alt="" className="w-5" />
                            <span>Tailwind CSS</span>
                        </button>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-[#4E46E5] text-white px-3 py-1.5 rounded-md"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ElementType;
