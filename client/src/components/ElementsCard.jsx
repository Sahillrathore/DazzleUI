import React, { useState } from "react";
import { FiPlus, FiDownload, FiCompass, FiFigma } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Card from "./Card";

const ElementsCard = () => {

    const { elements, setElements, allElements } = useAuth();
    
    return (
        <div className="bg-[#1111114f] px-10 py-4 shadow-2xl !shadow-white/20">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {allElements?.map((card, index) => (
                    <Card element={card} key={index} />
                ))}
            </div>

            <div className="flex justify-center w-full py-5">
                <Link to='/elements' className="animated-button">
                    <span>Explore All</span>
                    <span></span>
                </Link>
            </div>

        </div>
    );
};

export default ElementsCard;
